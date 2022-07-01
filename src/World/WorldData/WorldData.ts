//types
import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type {
 VoxelData,
 VoxelSubstanceType,
 VoxelTemplateSubstanceType,
} from "Meta/Voxels/Voxel.types.js";
import type { WorldRegion } from "Meta/World/WorldData/World.types.js";
//obejcts
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { Util } from "../../Global/Util.helper.js";
import { Position3Matrix } from "Meta/Util.types.js";

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

 heightByte: Util.getHeightByte(),
 lightByte: Util.getLightByte(),
 voxelByte: Util.getVoxelByte(),
 _3dArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),

 runRebuildCheck(x: number, y: number, z: number) {
  DVEW.queues.addToRebuildQue(x + 1, y, z, "all");
  DVEW.queues.addToRebuildQue(x - 1, y, z, "all");
  DVEW.queues.addToRebuildQue(x, y + 1, z, "all");
  DVEW.queues.addToRebuildQue(x, y - 1, z, "all");
  DVEW.queues.addToRebuildQue(x, y, z + 1, "all");
  DVEW.queues.addToRebuildQue(x, y, z - 1, "all");
  DVEW.queues.addToRebuildQue(x, y, z, "all");
 },

 __lightQueCheck(remove = false, x: number, y: number, z: number) {
  const l = this.getLight(x, y, z);
  if (l > 0) {
   if (this.lightByte.getS(l) > 0) {
    if (!remove) {
     DVEW.queues.addToSunLightUpdateQue(x, y, z);
    } else {
     DVEW.queues.addToSunLightRemoveQue(x, y, z);
    }
   }
   if (this.lightByte.hasRGBLight(l)) {
    if (!remove) {
     DVEW.queues.addToRGBUpdateQue(x, y, z);
    } else {
     DVEW.queues.addToRGBRemoveQue(x, y, z);
    }
   }
  }
 },

 runLightUpdateCheck(x: number, y: number, z: number, remove = false) {
  this.__lightQueCheck(remove, x, y, z);
  this.__lightQueCheck(remove, x + 1, y, z);
  this.__lightQueCheck(remove, x - 1, y, z);
  this.__lightQueCheck(remove, x, y + 1, z);
  this.__lightQueCheck(remove, x, y - 1, z);
  this.__lightQueCheck(remove, x, y, z + 1);
  this.__lightQueCheck(remove, x, y, z - 1);
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
  if (data === false) return;
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
     return -1;
    }
    return this.voxelByte.decodeLightFromVoxelData(voxel[2]);
   }
  }
  return -1;
 },

 removeData(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) {
   return false;
  }
  const chunk = this.getChunk(x, y, z);
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
  if (this._3dArray.getValueUseObj(voxelPOS, chunk.voxels)) {
   this._3dArray.setValueUseObj(voxelPOS, chunk.voxels, 0);
  } else {
   return false;
  }
 },

 getData(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) {
   return false;
  }

  const chunk = this.getChunk(x, y, z);
  if (!chunk || chunk.isEmpty) {
   return false;
  }

  return this._3dArray.getValueUseObj(
   this.worldBounds.getVoxelPosition(x, y, z),
   chunk.voxels
  );
 },

 setData(x: number, y: number, z: number, data: number) {
  const region = this.getRegion(x, y, z);
  if (!region) {
   return -1;
  }
  const chunk = this.getChunk(x, y, z);
  if (!chunk || chunk.isEmpty) {
   return -1;
  }
  return this._3dArray.setValueUseObj(
   this.worldBounds.getVoxelPosition(x, y, z),
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

  if (voxelData < 0 || voxelData === false) return false;

  let globalPalette = true;
  if (region.palette) {
   globalPalette = false;
  }

  if (voxelData >= 0) {
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
   DVEW.settings.settings.world?.voxelPaletteMode == "per-region";
  const newRegion = DVEW.worldGeneration.getBlankRegion(regionPalette);
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  this.regions[regionKey] = newRegion;
  return newRegion;
 },

 getRegion(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) {
   return false;
  }
  return this.regions[regionKey];
 },

 addChunk(x: number, y: number, z: number) {
  const chunk = DVEW.worldGeneration.getBlankChunk(false);
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
  const voxelData = DVEW.voxelManager.getVoxel(voxelId);
  if (!voxelData) return;
  let region = this.getRegion(x, y, z);
  if (!region) {
   region = this.addRegion(x, y, z);
  }
  let chunk = this.getChunk(x, y, z);
  if (!chunk) {
   chunk = this.addChunk(x, y, z);
  }
  const data = voxelPaletteGetFunctions[
   //@ts-ignore
   DVEW.settings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, region);
  if (data < 0) return;
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
  this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData, chunk);
  this._3dArray.setValueUseObj(voxelPOS, chunk.voxels, data);
  if (DVEW.settings.doRGBPropagation()) {
   const voxel = DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.lightSource && voxel.lightValue) {
    DVEW.queues.addToRGBUpdateQue(x, y, z);
   }
  }
 },

 __handleHeightMapUpdateForVoxelAdd(
  voxelPOS: Position3Matrix,
  voxelData: VoxelData,
  chunk: ChunkData
 ) {
  let substance = voxelData.substance;
  if (substance == "transparent") {
   substance = "solid";
  }
  this.heightByte.calculateHeightAddDataForSubstance(
   voxelPOS.y,
   substance,
   voxelPOS.x,
   voxelPOS.z,
   chunk.heightMap
  );
  this.heightByte.updateChunkMinMax(voxelPOS, chunk.minMaxMap);
 },

 __handleHeightMapUpdateForVoxelRemove(
  voxelPOS: Position3Matrix,
  voxelData: VoxelData,
  chunk: ChunkData
 ) {
  let substance = voxelData.substance;
  if (substance == "transparent") {
   substance = "solid";
  }
  let needToRecalculateHeightMap =
   this.heightByte.calculateHeightRemoveDataForSubstance(
    voxelPOS.y,
    substance,
    voxelPOS.x,
    voxelPOS.z,
    chunk.heightMap
   );
  if (needToRecalculateHeightMap) {
   /**
    * @TODO implement this
    */
  }
 },

 getChunk(x: number, y: number, z: number): ChunkData | false {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
  if (!region.chunks[worldColumnKey]) return false;
  if (!region.chunks[worldColumnKey][chunkKey]) return false;
  return region.chunks[worldColumnKey][chunkKey];
 },

 removeChunk(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunks = region.chunks;
  delete chunks[this.worldBounds.getChunkKeyFromPosition(x, y, z)];
 },

 setChunk(
  x: number,
  y: number,
  z: number,
  chunk: ChunkData,
  doNotSyncInThreads = false
 ) {
  let region = this.getRegion(x, y, z);
  if (!region) {
   region = this.addRegion(x, y, z);
  }
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
  const chunks = region.chunks;
  chunk.position[0] = chunkPOS.x;
  chunk.position[1] = chunkPOS.y;
  chunk.position[2] = chunkPOS.z;

  if (!chunks[worldColumnKey]) {
   chunks[worldColumnKey] = {};
  }

  chunks[worldColumnKey][chunkKey] = chunk;
  if (doNotSyncInThreads) return;
  DVEW.constructorCommManager.syncChunkInAllThreads(
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z
  );
  if (DVEW.settings.syncChunksInNexus()) {
   DVEW.matrixCentralHub.syncChunkInThread(
    "nexus",
    chunkPOS.x,
    chunkPOS.y,
    chunkPOS.z
   );
  }
  if (DVEW.settings.syncChunkInDataThread()) {
   DVEW.matrixCentralHub.syncChunkInThread(
    "data",
    chunkPOS.x,
    chunkPOS.y,
    chunkPOS.z
   );
  }
 },

 async __runLightRemoveAndUpdates(remove = true, update = true) {
  if (remove) {
   if (DVEW.settings.doRGBPropagation()) {
    DVEW.queues.runRGBRemoveQue();
    await DVEW.queues.awaitAllRGBLightRemove();
   }
   if (DVEW.settings.doSunPropagation()) {
    DVEW.queues.runSunLightRemoveQue();
    await DVEW.queues.awaitAllSunLightRemove();
   }
  }
  if (update) {
   if (DVEW.settings.doRGBPropagation()) {
    DVEW.queues.runRGBUpdateQue();
   }
   if (DVEW.settings.doSunPropagation()) {
    DVEW.queues.runSunLightUpdateQue();
   }
   await Promise.all([
    DVEW.queues.awaitAllRGBLightUpdates(),
    DVEW.queues.awaitAllSunLightUpdates(),
   ]);
  }
 },

 async requestVoxelAdd(
  voxelId: string,
  voxelStateId: string,
  x: number,
  y: number,
  z: number
 ) {
  const voxelData = DVEW.voxelManager.getVoxel(voxelId);
  if (!voxelData) return;
  let region = this.getRegion(x, y, z);

  if (!region) {
   region = this.addRegion(x, y, z);
  }

  let chunk = this.getChunk(x, y, z);
  if (!chunk) {
   chunk = this.addChunk(x, y, z);
  }
  const data = voxelPaletteGetFunctions[
   //@ts-ignore
   DVEW.settings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, region);
  if (data < 0) return;

  const l = this.getLight(x, y, z);
  if (l > 0) {
   if (DVEW.settings.doRGBPropagation()) {
    if (this.lightByte.hasRGBLight(l)) {
     DVEW.queues.addToRGBRemoveQue(x, y, z);
    }
   }
   if (DVEW.settings.doSunPropagation()) {
    if (this.lightByte.getS(l) > 0) {
     DVEW.queues.addToSunLightRemoveQue(x, y - 1, z);
     DVEW.queues.addToSunLightRemoveQue(x, y, z);
    }
   }

   await this.__runLightRemoveAndUpdates(true, false);
  }

  let needLightUpdate = false;
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
  this._3dArray.setValueUseObj(voxelPOS, chunk.voxels, data);
  this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData, chunk);
  this.runRebuildCheck(x, y, z);

  if (DVEW.settings.settings.lighting?.autoRGBLight) {
   if (voxelData.lightSource && voxelData.lightValue) {
    needLightUpdate = true;
    DVEW.queues.addToRGBUpdateQue(x, y, z);
   }
  }
  if (DVEW.settings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    await this.__runLightRemoveAndUpdates(false, true);
   }

   DVEW.queues.runRebuildQue();
   await DVEW.queues.awaitAllChunksToBeBuilt();
  }
 },

 async requestVoxelBeRemoved(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return;
  const voxelCheck = this.getVoxel(x, y, z);
  if (!voxelCheck || voxelCheck[0] == -1) return;
  const voxelData = <VoxelData>voxelCheck[0];
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
  this.__handleHeightMapUpdateForVoxelRemove(voxelPOS, voxelData, chunk);
  this.runRebuildCheck(x, y, z);
  const l = this.getLight(x, y, z);

  if (l > 0) {
   this.setAir(x, y, z, l);
   if (DVEW.settings.doRGBPropagation()) {
    DVEW.queues.addToRGBRemoveQue(x, y, z);
   }
   if (DVEW.settings.doSunPropagation()) {
    DVEW.queues.addToSunLightRemoveQue(x, y, z);
   }
  }
  if (l < 0) {
   this.setAir(x, y, z, 0);
   this.runLightUpdateCheck(x, y, z);
  }

  if (DVEW.settings.settings.updating?.autoRebuild) {
   await this.__runLightRemoveAndUpdates(true, true);

   DVEW.queues.runRebuildQue();
   await DVEW.queues.awaitAllChunksToBeBuilt();
  }
 },
 getWorldColumn(x: number, z: number) {
  const region = this.getRegion(x, this.worldBounds.bounds.MinY, z);
  if (!region) {
   return false;
  }
  const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
  const worldWolumn = region.chunks[worldColumnKey];
  if (!worldWolumn) return;
  return worldWolumn;
 },
 getRelativeMaxWorldColumnHeight(x: number, z: number) {
  const chunkWidth = this.worldBounds.chunkXSize;
  const chunkDepth = this.worldBounds.chunkZSize;
  let maxHeight = -Infinity;
  const center = this.getAbsoluteHeightOfWorldColumn(x, z);
  if (center > maxHeight) maxHeight = center;
  const north = this.getAbsoluteHeightOfWorldColumn(x, z + chunkDepth);
  if (north > maxHeight) maxHeight = north;
  const south = this.getAbsoluteHeightOfWorldColumn(x, z - chunkDepth);
  if (south > maxHeight) maxHeight = south;
  const east = this.getAbsoluteHeightOfWorldColumn(x + chunkWidth, z);
  if (east > maxHeight) maxHeight = east;
  const west = this.getAbsoluteHeightOfWorldColumn(x - chunkWidth, z);
  if (west > maxHeight) maxHeight = west;
  const northEast = this.getAbsoluteHeightOfWorldColumn(
   x + chunkWidth,
   z + chunkDepth
  );
  if (northEast > maxHeight) maxHeight = northEast;
  const northWest = this.getAbsoluteHeightOfWorldColumn(
   x - chunkWidth,
   z + chunkDepth
  );
  if (northWest > maxHeight) maxHeight = northWest;
  const southEast = this.getAbsoluteHeightOfWorldColumn(
   x + chunkWidth,
   z + chunkDepth
  );
  if (southEast > maxHeight) maxHeight = southEast;
  const southWest = this.getAbsoluteHeightOfWorldColumn(
   x - chunkWidth,
   z + chunkDepth
  );
  if (southWest > maxHeight) maxHeight = southWest;
  return maxHeight;
 },
 getAbsoluteHeightOfWorldColumn(x: number, z: number) {
  const worldColumn = this.getWorldColumn(x, z);
  if (!worldColumn) return -Infinity;
  const chunkKeys = Object.keys(worldColumn);
  if (chunkKeys.length == 0) return -Infinity;
  let maxHeight = -Infinity;
  for (const chunkKey of chunkKeys) {
   const chunk = worldColumn[chunkKey];

   const chunkMax =
    this.heightByte.getChunkMax(chunk.minMaxMap) + chunk.position[1];
   if (maxHeight < chunkMax) {
    maxHeight = chunkMax;
   }
  }
  return maxHeight + 1;
 },
 fillWorldCollumnWithChunks(x: number, z: number) {
  for (
   let y = this.worldBounds.bounds.MinY;
   y < this.worldBounds.bounds.MaxY;
   y += this.worldBounds.chunkYSize
  ) {
   if (!this.getChunk(x, y, z)) {
    this.addChunk(x, y, z);
   }
  }
 },
};
