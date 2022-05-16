//types
import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { VoxelData, VoxelSubstanceType } from "Meta/Voxels/Voxel.types.js";
import type { WorldRegion } from "Meta/World/WorldData/World.types.js";
//obejcts
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { Util } from "../../Global/Util.helper.js";

const voxelPaletteGetFunctions = <
 Record<
  string,
  (voxelId: string, voxelStateId: string, region?: WorldRegion) => number
 >
>{
 global: (voxelId: string, voxelStateId: string) => {
  const paletteId =
   DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    voxelId,
    voxelStateId
   );
  if (paletteId) {
   return DVEW.worldGeneration.paintVoxel(paletteId);
  }
  return -1;
 },
 "per-region": (
  voxelId: string,
  voxelStateId: string,
  region?: WorldRegion
 ) => {
  if (!region) return -1;
  const paletteId =
   DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromRegion(
    region,
    voxelId,
    voxelStateId
   );
  if (paletteId) {
   return DVEW.worldGeneration.paintVoxel(paletteId);
  } else {
   const newPaletteId =
    DVEW.worldGeneration.voxelPalette.addToRegionsVoxelPalette(
     region,
     voxelId,
     voxelStateId
    );
   if (!newPaletteId) return -1;
   return DVEW.worldGeneration.paintVoxel(newPaletteId);
  }
 },
};

/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export const WorldData = {
 regions: <Record<string, WorldRegion>>{},

 chunks: <Record<string, ChunkData>>{},

 _RGBLightRemoveQue: <number[][]>[],
 _RGBLightUpdateQue: <number[][]>[],

 _chunkRebuildQue: <number[][]>[],
 _chunkRebuildQueMap: <
  Record<string, Record<VoxelSubstanceType | "all", boolean>>
 >{},

 infoByte: Util.getInfoByte(),
 lightByte: Util.getLightByte(),
 voxelByte: Util.getVoxelByte(),
 _3dArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),

 getRGBLightUpdateQue() {
  return this._RGBLightUpdateQue;
 },
 clearRGBLightUpdateQue() {
  this._RGBLightUpdateQue = [];
 },

 getRGBLightRemoveQue() {
  return this._RGBLightRemoveQue;
 },
 clearRGBLightRemoveQue() {
  this._RGBLightRemoveQue = [];
 },

 getChunkRebuildQue() {
  return this._chunkRebuildQue;
 },
 getSubstanceNeededToRebuild(chunkX: number, chunkY: number, chunkZ: number) {
  return this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`];
 },

 clearChunkRebuildQue() {
  this._chunkRebuildQue = [];
  this._chunkRebuildQueMap = {};
 },

 runRebuildChekc(x: number, y: number, z: number) {
  this.addToRebuildQue(x, y, z, "all");
  this.addToRebuildQue(x + 1, y, z, "all");
  this.addToRebuildQue(x - 1, y, z, "all");
  this.addToRebuildQue(x, y + 1, z, "all");
  this.addToRebuildQue(x, y - 1, z, "all");
  this.addToRebuildQue(x, y, z + 1, "all");
  this.addToRebuildQue(x, y, z - 1, "all");
 },

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: "all" | VoxelSubstanceType
 ) {
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  if (!this._chunkRebuildQueMap[chunkKey]) {
   this._chunkRebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
   //@ts-ignore
   this._chunkRebuildQueMap[chunkKey] = {};
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  } else {
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  }
 },

 getCurrentWorldDataSize() {
  const data = JSON.stringify(this.regions);
  return new Blob([data]).size;
 },
 getCurrentWorldDataString() {
  return JSON.stringify(this.regions);
 },

 setAir(x: number, y: number, z: number, lightValue: number) {
  let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
  this.setData(x, y, z, data);
 },
 setLight(x: number, y: number, z: number, lightValue: number) {
  let data = this.getData(x, y, z);
  data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
  this.setData(x, y, z, data);
 },

 getLight(x: number, y: number, z: number): number {
  const voxel = this.getVoxel(x, y, z);
  if (voxel) {
   if (voxel[0] == -1) {
    return this.voxelByte.decodeLightFromVoxelData(<number>voxel[1]);
   } else {
    const voxelData = <VoxelData>voxel[0];
    if (voxelData.lightSource && voxelData.lightValue) {
     return voxelData.lightValue;
    }
    if (voxelData.substance == "solid") {
     return 0;
    }
    return this.voxelByte.decodeLightFromVoxelData(voxel[2]);
   }
  }
  return 0;
 },

 removeData(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);

  let region = this.regions[regionKey];
  if (!region) {
   return false;
  }

  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const chunk = chunks[chunkKey];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
  if (
   this._3dArray.getValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels)
  ) {
   this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, 0);
  } else {
   return false;
  }
 },

 getData(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);

  let region = this.regions[regionKey];
  if (!region) {
   return -1;
  }

  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const chunk = chunks[chunkKey];
  if (!chunk || chunk.isEmpty) {
   return -1;
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);

  return this._3dArray.getValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels
  );
 },

 setData(x: number, y: number, z: number, data: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);

  let region = this.regions[regionKey];
  if (!region) {
   return -1;
  }

  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const chunk = chunks[chunkKey];
  if (!chunk || chunk.isEmpty) {
   return -1;
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
  return this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );
 },

 getVoxel(
  x: number,
  y: number,
  z: number
 ): [VoxelData | number, string | number, number] | false {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const voxelData = this.getData(x, y, z);
  if (voxelData < 0) return false;

  let globalPalette = true;
  if (region.palette) {
   globalPalette = false;
  }

  if (voxelData) {
   const voxelId = this.voxelByte.getId(voxelData);
   if (voxelId == 0) {
    return [-1, voxelData, 0];
   } else {
    let voxelTrueID: string = "";
    let voxelState: string = "";
    if (globalPalette) {
     const check =
      DVEW.worldGeneration.voxelPalette.getVoxelDataFromGlobalPalette(voxelId);
     if (check) {
      voxelTrueID = check[0];
      voxelState = check[1];
     } else {
      return false;
     }
    } else {
     const check = DVEW.worldGeneration.voxelPalette.getVoxelDataFromRegion(
      region,
      voxelId
     );
     if (check) {
      voxelTrueID = check[0];
      voxelState = check[1];
     } else {
      return false;
     }
    }

    const voxel = DVEW.voxelManager.getVoxel(voxelTrueID);
    return [voxel, voxelState, voxelData];
   }
  } else {
   return false;
  }
 },

 addRegion(x: number, y: number, z: number): WorldRegion {
  let regionPalette =
   DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region";
  const newRegion = DVEW.worldGeneration.getBlankRegion(regionPalette);
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);
  this.regions[regionKey] = newRegion;
  return newRegion;
 },

 getRegion(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);
  if (!this.regions[regionKey]) return false;
  return this.regions[regionKey];
 },

 addChunk(x: number, y: number, z: number) {
  const chunk = DVEW.worldGeneration.getBlankChunk(false);
  if (
   DVEW.engineSettings.settings.lighting?.doSunLight ||
   DVEW.engineSettings.settings.lighting?.doRGBLight
  ) {
   if (
    DVEW.engineSettings.settings.lighting?.autoRGBLight ||
    DVEW.engineSettings.settings.lighting?.autoSunLight
   ) {
    DVEW.worldGeneration.chunkDataHelper.fillWithAir(chunk);
   }
  }
  this.setChunk(x, y, z, chunk);
  return chunk;
 },

 paintVoxel(
  voxelId: string,
  voxelStateId: string,
  x: number,
  y: number,
  z: number
 ) {
  let region = this.getRegion(x, y, z);

  if (!region) {
   region = this.addRegion(x, y, x);
  }

  const chunks = region.chunks;

  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);

  let chunk = chunks[chunkKey];
  if (!chunk) {
   chunk = this.addChunk(x, y, z);
   }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
  const data = voxelPaletteGetFunctions[
   //@ts-ignore
   DVEW.engineSettings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, region);
  if (data < 0) return;
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );
  if (DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.lightSource && voxel.lightValue) {
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }
 },

 insertData(x: number, y: number, z: number, data: number) {
  let region = this.getRegion(x, y, z);
  if (!region) {
   region = this.addRegion(x, y, x);
  }
  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  let chunk = chunks[chunkKey];
  if (!chunk) {
   chunk = this.addChunk(x, y, z);
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );
 },

 getChunk(x: number, y: number, z: number): ChunkData | false {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  if (!chunks[chunkKey]) return false;
  return chunks[chunkKey];
 },

 removeChunk(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  delete chunks[chunkKey];
 },

 setChunk(
  x: number,
  y: number,
  z: number,
  chunk: ChunkData,
  doNotSyncInBuilderThread = false
 ) {
  let region = this.getRegion(x, y, z);
  if (!region) {
   region = this.addRegion(x, y, z);
  }
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const chunks = region.chunks;
  chunks[chunkKey] = chunk;
  if (doNotSyncInBuilderThread) return;
  DVEW.builderCommManager.syncChunkInAllBuilders(
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z
  );
 },

 requestVoxelAdd(
  voxelId: string,
  voxelStateId: string,
  x: number,
  y: number,
  z: number
 ) {
  let region = this.getRegion(x, y, z);

  if (!region) {
   region = this.addRegion(x, y, x);
  }

  const chunks = region.chunks;

  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);

  let chunk = chunks[chunkKey];
  if (!chunk) {
   chunk = this.addChunk(x, y, z);
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
  const data = voxelPaletteGetFunctions[
   //@ts-ignore
   DVEW.engineSettings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, region);
  if (data < 0) return;
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );

  this.runRebuildChekc(x, y, z);
  let needLightUpdate = false;
  if (DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.lightSource && voxel.lightValue) {
    needLightUpdate = true;
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }
  if (DVEW.engineSettings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    DVEW.runRGBLightUpdateQue();
   }
   DVEW.runChunkRebuildQue();
  }
 },

 requestVoxelBeRemoved(x: number, y: number, z: number) {
  const voxelCheck = this.getVoxel(x, y, z);
  if (!voxelCheck || voxelCheck[0] == -1) return;
  const voxel = <VoxelData>voxelCheck[0];

  this.runRebuildChekc(x, y, z);
  let needLightUpdate = false;
  if (DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   if (voxel.lightSource && voxel.lightValue) {
    this._RGBLightRemoveQue.push([x, y, z]);
    needLightUpdate = true;
   }
  }

  if (DVEW.engineSettings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    DVEW.runRGBLightRemoveQue();
   }
   DVEW.runChunkRebuildQue();
  }

  this.setData(x, y, z, 0);
 },
};
