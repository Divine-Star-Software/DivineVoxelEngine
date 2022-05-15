import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { InfoByte } from "Global/Util/InfoByte.js";
import type { LightByte } from "Global/Util/LightByte.js";
import type { VoxelData, VoxelSubstanceType } from "Meta/Voxels/Voxel.types.js";

import { VoxelByte } from "Global/Util/VoxelByte.js";
import { WorldRegion } from "Meta/WorldData/World.types.js";
import { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { WorldBounds } from "Global/WorldBounds/WorldBounds.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export class WorldData {
 renderDistance = 20;

 worldBounds: typeof WorldBounds;

 regionXPow2 = 9;
 regionZPow2 = 9;
 regionYPow2 = 8;

 voxelPaletteFunctions: Record<
  string,
  (
   voxelId: string,
   voxelStateId: string,
   chunk: ChunkData,
   region?: WorldRegion
  ) => number
 > = {
  global: (
   voxelId: string,
   voxelStateId: string,
   chunk: ChunkData,
   region?: WorldRegion
  ) => {
   const check =
    this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
     voxelId,
     voxelStateId
    );
   if (check) {
    return this.DVEW.worldGeneration.paintVoxel(check);
   }
   return -1;
  },
  "per-region": (
   voxelId: string,
   voxelStateId: string,
   chunk: ChunkData,
   region?: WorldRegion
  ) => {
   if (!region) return -1;
   const check =
    this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromRegion(
     region,
     voxelId,
     voxelStateId
    );
   if (check) {
    return this.DVEW.worldGeneration.paintVoxel(check);
   } else {
    const newPaletteId =
     this.DVEW.worldGeneration.voxelPalette.addToRegionsVoxelPalette(
      region,
      voxelId,
      voxelStateId
     );
    if (!newPaletteId) return -1;
    return this.DVEW.worldGeneration.paintVoxel(newPaletteId);
   }
  },
 };

 regions: Record<string, WorldRegion> = {};

 chunks: Record<string, ChunkData> = {};

 _RGBLightRemoveQue: number[][] = [];
 _RGBLightUpdateQue: number[][] = [];

 _chunkRebuildQue: number[][] = [];
 _chunkRebuildQueMap: Record<
  string,
  Record<VoxelSubstanceType | "all", boolean>
 > = {};

 infoByte: typeof InfoByte;
 lightByte: typeof LightByte;
 voxelByte: typeof VoxelByte;
 _3dArray: typeof Flat3DArray;

 substanceRules: Record<string, boolean> = {
  "solid-solid": false,
  "solid-flora": true,
  "solid-transparent": true,
  "solid-fluid": true,
  "solid-magma": true,

  "transparent-solid": true,
  "transparent-flora": true,
  "transparent-transparent": true,
  "transparent-fluid": true,
  "transparent-magma": true,

  "flora-solid": true,
  "flora-flora": true,
  "flora-transparent": true,
  "flora-fluid": true,
  "flora-magma": true,

  "fluid-solid": false,
  "fluid-flora": true,
  "fluid-transparent": true,
  "fluid-fluid": false,
  "fluid-magma": true,

  "magma-solid": false,
  "magma-flora": true,
  "magma-transparent": true,
  "magma-fluid": true,
  "magma-magma": false,
 };

 lightValueFunctions = {
  r: (value: number) => {
   return this.lightByte.getR(value);
  },
  g: (value: number) => {
   return this.lightByte.getG(value);
  },
  b: (value: number) => {
   return this.lightByte.getB(value);
  },
  s: (value: number) => {
   return this.lightByte.getS(value);
  },
 };

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.worldBounds = DVEW.worldBounds;
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
  this.voxelByte = this.DVEW.UTIL.getVoxelByte();
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 syncChunkBounds(): void {
  this.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
 }

 getRGBLightUpdateQue() {
  return this._RGBLightUpdateQue;
 }
 clearRGBLightUpdateQue() {
  this._RGBLightUpdateQue = [];
 }

 getRGBLightRemoveQue() {
  return this._RGBLightRemoveQue;
 }
 clearRGBLightRemoveQue() {
  this._RGBLightRemoveQue = [];
 }

 getChunkRebuildQue() {
  return this._chunkRebuildQue;
 }
 getSubstanceNeededToRebuild(chunkX: number, chunkY: number, chunkZ: number) {
  return this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 clearChunkRebuildQue() {
  this._chunkRebuildQue = [];
  this._chunkRebuildQueMap = {};
 }

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
 }

 getCurrentWorldDataSize() {
  const data = JSON.stringify(this.regions);
  return new Blob([data]).size;
 }
 getCurrentWorldDataString() {
  return JSON.stringify(this.regions);
 }

 setAir(x: number, y: number, z: number, lightValue: number) {
  let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
  this.setData(x, y, z, data);
 }
 setLight(x: number, y: number, z: number, lightValue: number) {
  let data = this.getData(x, y, z);
  data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
  this.setData(x, y, z, data);
 }
 /**# Get Light
  * ---
  * Returns the raw light value for a voxel.
  */
 getLight(x: number, y: number, z: number): number {
  const voxel = this.getVoxel(x, y, z);
  if (voxel) {
   if (voxel[0] == -1) {
    return this.voxelByte.decodeLightFromVoxelData(voxel[1]);
   } else {
    const voxelData: VoxelData = voxel[0];
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
 }
 /**# Get Light Value
  * ---
  * Returns the value of the light level type for the given voxel at x,y,z.
  */
 getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s") {
  return this.lightValueFunctions[type](this.getLight(x, y, z));
 }

 /**# Is Exposed
  * ---
  * Will return true if any face of the voxel is exposed.
  * Must provide the voxel's x,y,z position.
  */
 isVoxelExposed(
  voxel: VoxelData,
  voxelData: number,
  x: number,
  y: number,
  z: number
 ) {
  if (this.voxelFaceCheck(voxel, voxelData, x + 1, y, z)) {
   return true;
  }
  if (this.voxelFaceCheck(voxel, voxelData, x - 1, y, z)) {
   return true;
  }
  if (this.voxelFaceCheck(voxel, voxelData, x, y + 1, z)) {
   return true;
  }
  if (this.voxelFaceCheck(voxel, voxelData, x, y - 1, z)) {
   return true;
  }
  if (this.voxelFaceCheck(voxel, voxelData, x, y, z + 1)) {
   return true;
  }
  if (this.voxelFaceCheck(voxel, voxelData, x, y, z - 1)) {
   return true;
  }
  return false;
 }

 /**# Voxel Face Check
  * ---
  * Determines if a face of a voxel is exposed.
  * You must provide the x,y,z position for the face that is being checked.
  * For instance if you want to check the top face it would be the voxels y plus 1.
  */
 voxelFaceCheck(
  voxel: VoxelData,
  voxelData: number,
  x: number,
  y: number,
  z: number
 ) {
  const voxelCheck = this.getVoxel(x, y, z);
  if (voxelCheck && voxelCheck[0] != -1) {
   const neighborVoxel: VoxelData = voxelCheck[0];

   if (this.substanceRules[`${voxel.substance}-${neighborVoxel.substance}`]) {
    return true;
   } else {
    return false;
   }
  } else {
   return true;
  }
 }

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
 }

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
 }

 /**# Set Data
  * ---
  * Sets the data for a specific point in the world data.
  * Will not make a new chunk if there is none and just return false.
  */
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
 }

 getVoxel(x: number, y: number, z: number): any[] | false {
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
    return [-1, voxelData];
   } else {
    let voxelTrueID: string = "";
    let voxelState: string = "";
    if (globalPalette) {
     const check =
      this.DVEW.worldGeneration.voxelPalette.getVoxelDataFromGlobalPalette(
       voxelId
      );
     if (check) {
      voxelTrueID = check[0];
      voxelState = check[1];
     } else {
      return false;
     }
    } else {
     const check =
      this.DVEW.worldGeneration.voxelPalette.getVoxelDataFromRegion(
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

    const voxel = this.DVEW.voxelManager.getVoxel(voxelTrueID);
    return [voxel, voxelState, voxelData];
   }
  } else {
   return false;
  }
 }

 addRegion(x: number, y: number, z: number) {
  let regionPalette =
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region";
  const newRegion = this.DVEW.worldGeneration.getBlankRegion(regionPalette);
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);
  this.regions[regionKey] = newRegion;
  return newRegion;
 }

 getRegion(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const regionKey = this.worldBounds.getRegionKey(regionPOS);
  if (!this.regions[regionKey]) return false;
  return this.regions[regionKey];
 }

 addChunk(x: number, y: number, z: number) {
  const chunk = this.DVEW.worldGeneration.getBlankChunk(false);
  if (
   this.DVEW.engineSettings.settings.lighting?.doSunLight ||
   this.DVEW.engineSettings.settings.lighting?.doRGBLight
  ) {
   if (
    this.DVEW.engineSettings.settings.lighting?.autoRGBLight ||
    this.DVEW.engineSettings.settings.lighting?.autoSunLight
   ) {
    this.DVEW.worldGeneration.chunkDataHelper.fillWithAir(chunk);
   }
  }
  this.setChunk(x, y, z, chunk);
  return chunk;
 }

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
  const data = this.voxelPaletteFunctions[
   //@ts-ignore
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, chunk);
  if (data < 0) return;
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );
  if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.lightSource && voxel.lightValue) {
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }
 }
 /**# Insert Data
  * ---
  * Acts like **setData** but will create a new chunk if it does not exist.
  */
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
 }

 getChunk(x: number, y: number, z: number): ChunkData | false {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  if (!chunks[chunkKey]) return false;
  return chunks[chunkKey];
 }

 removeChunk(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunks = region.chunks;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  delete chunks[chunkKey];
 }

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
  const chunkKey = this.worldBounds.getRegionKey(chunkPOS);
  const chunks = region.chunks;
  chunks[chunkKey] = chunk;
  if (doNotSyncInBuilderThread) return;
  this.DVEW.builderCommManager.syncChunkInAllBuilders(
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z
  );
 }

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
  const data = this.voxelPaletteFunctions[
   //@ts-ignore
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, chunk);
  if (data < 0) return;
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );

  let needLightUpdate = false;
  if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.lightSource && voxel.lightValue) {
    needLightUpdate = true;
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }

  this.addToRebuildQue(x, y, z, "all");
  this.addToRebuildQue(x + 1, y, z, "all");
  this.addToRebuildQue(x - 1, y, z, "all");
  this.addToRebuildQue(x, y + 1, z, "all");
  this.addToRebuildQue(x, y - 1, z, "all");
  this.addToRebuildQue(x, y, z + 1, "all");
  this.addToRebuildQue(x, y, z - 1, "all");

  if (this.DVEW.engineSettings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    this.DVEW.runRGBLightUpdateQue();
    if (this.DVEW.engineSettings.settings.updating?.rebuildMode == "sync") {
     this.DVEW.runChunkRebuildQue();
    } else {
     this.DVEW.runChunkRebuildQue();
    }
   }
  }
 }
 requestVoxelBeRemoved(x: number, y: number, z: number) {
  const voxelCheck = this.getVoxel(x, y, z);
  if (!voxelCheck || voxelCheck[0] == -1) return;
  const voxel = voxelCheck[0];

  this.addToRebuildQue(x, y, z, "all");
  this.addToRebuildQue(x + 1, y, z, "all");
  this.addToRebuildQue(x - 1, y, z, "all");
  this.addToRebuildQue(x, y + 1, z, "all");
  this.addToRebuildQue(x, y - 1, z, "all");
  this.addToRebuildQue(x, y, z + 1, "all");
  this.addToRebuildQue(x, y, z - 1, "all");

  let needLightUpdate = false;
  if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   if (voxel.data.lightSource && voxel.data.lightValue) {
    this._RGBLightRemoveQue.push([x, y, z]);
    needLightUpdate = true;
   }
  }

  if (this.DVEW.engineSettings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    this.DVEW.runRGBLightRemoveQue();
    if (this.DVEW.engineSettings.settings.updating?.rebuildMode == "sync") {
     this.DVEW.runChunkRebuildQue();
    } else {
     this.DVEW.runChunkRebuildQue();
    }
   }
  }

  this.setData(x, y, z, 0);
 }
}
