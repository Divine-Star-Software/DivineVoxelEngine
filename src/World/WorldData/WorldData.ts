import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { InfoByte } from "Global/Util/InfoByte.js";
import type { LightByte } from "Global/Util/LightByte.js";
import type {
 VoxelInteface,
 VoxelSubstanceType,
} from "Meta/World/Voxels/Voxel.types.js";

import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { VoxelByte } from "Global/Util/VoxelByte.js";
import { WorldRegion } from "Meta/WorldData/World.types.js";
import { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { ChunkBounds } from "Global/Chunks/ChunkBounds.js";
import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";

/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export class WorldData implements ChunkBound {
 renderDistance = 20;

 chunkBounds: ChunkBounds;

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
  "per-chunk": (
   voxelId: string,
   voxelStateId: string,
   chunk: ChunkData,
   region?: WorldRegion
  ) => {
   const check = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteId(
    chunk,
    voxelId,
    voxelStateId
   );
   if (check) {
    return check;
   } else {
    const newPaletteId =
     this.DVEW.worldGeneration.voxelPalette.addToChunksVoxelPalette(
      chunk,
      voxelId,
      voxelStateId
     );
    if (!newPaletteId) return -1;
    return this.DVEW.worldGeneration.paintVoxel(newPaletteId);
   }
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
 calculdateVoxelLight = CalculateVoxelLight;
 voxellightMixCalc = VoxelLightMixCalc;

 infoByte: InfoByte;
 lightByte: LightByte;
 voxelByte: VoxelByte;
 _3dArray: Flat3DArray;

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
  this.chunkBounds = DVEW.chunkBounds;
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
  this.voxelByte = this.DVEW.UTIL.getVoxelByte();
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }


 syncChunkBounds(): void {
     this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
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
  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  if (!this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`]) {
   this._chunkRebuildQue.push([chunkX, chunkY, chunkZ]);
   //@ts-ignore
   this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`] = {};
   this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`][substance] = true;
  } else {
   this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`][substance] = true;
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
  * @param x
  * @param y
  * @param z
  * @returns
  */
 getLight(x: number, y: number, z: number): number {
  const voxel = this.getVoxel(x, y, z);
  if (voxel) {
   if (voxel[0] == -1) {
    return this.voxelByte.decodeLightFromVoxelData(voxel[1]);
   } else {
    const voxelInterface: VoxelInteface = voxel[0];
    if (voxelInterface.data.lightSource && voxelInterface.data.lightValue) {
     return voxelInterface.data.lightValue;
    }
    if (voxelInterface.data.substance == "solid") {
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
  * @param x
  * @param y
  * @param z
  * @param type
  * @returns
  */
 getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s") {
  return this.lightValueFunctions[type](this.getLight(x, y, z));
 }

 /**# Is Exposed
  * ---
  * Will return true if any face of the voxel is exposed.
  * Must provide the voxel's x,y,z position.
  * @param voxel
  * @param voxelData
  * @param x
  * @param y
  * @param z
  * @returns
  */
 isVoxelExposed(
  voxel: VoxelInteface,
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
  * @param voxel
  * @param voxelData
  * @param x
  * @param y
  * @param z
  * @returns
  */
 voxelFaceCheck(
  voxel: VoxelInteface,
  voxelData: number,
  x: number,
  y: number,
  z: number
 ) {
  const voxelCheck = this.getVoxel(x, y, z);
  if (voxelCheck && voxelCheck[0] != -1) {
   const neighborVoxel: VoxelInteface = voxelCheck[0];

   if (
    this.substanceRules[
     `${voxel.data.substance}-${neighborVoxel.data.substance}`
    ]
   ) {
    return true;
   } else {
    return false;
   }
  } else {
   return true;
  }
 }

 removeData(x: number, y: number, z: number) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return false;
  }

  const chunks = region.chunks;

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  if (this._3dArray.getValue(voxelX, voxelY, voxelZ, chunk.voxels)) {
   this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk.voxels, 0);
  } else {
   return false;
  }
 }

 getVoxel(x: number, y: number, z: number): any[] | false {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;


  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return false;
  }
  const chunks = region.chunks;

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];

  if (!chunk || chunk.isEmpty) {
   return false;
  }

  let globalPalette = true;
  if (chunk.palette) {
   globalPalette = false;
  }

  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  const voxelData = this._3dArray.getValue(
   voxelX,
   voxelY,
   voxelZ,
   chunk.voxels
  );
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
     const check = this.DVEW.worldGeneration.voxelPalette.getVoxelData(
      chunk,
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

 getData(x: number, y: number, z: number) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return 0;
  }

  const chunks = region.chunks;

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return 0;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  const voxel = this._3dArray.getValue(voxelX, voxelY, voxelZ, chunk.voxels);
  if (voxel) {
   return voxel;
  } else {
   return 0;
  }
 }

 /**# Set Data
  * ---
  * Sets the data for a specific point in the world data.
  * Will not make a new chunk if there is none and just return false.
  * @param x
  * @param y
  * @param z
  * @param data
  * @returns
  */
 setData(x: number, y: number, z: number, data: number) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   region = this.addRegion(regionX, regionY, regionZ);
  }

  const chunks = region.chunks;

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk.voxels, data);
 }

 addRegion(regionX: number, regionY: number, regionZ: number) {
  let regionPalette =
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region";
  const newRegion = this.DVEW.worldGeneration.getBlankRegion(regionPalette);
  this.regions[`${regionX}-${regionZ}-${regionY}`] = newRegion;
  return newRegion;
 }

 paintVoxel(
  voxelId: string,
  voxelStateId: string,
  x: number,
  y: number,
  z: number
 ) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   region = this.addRegion(regionX, regionY, regionZ);
  }

  const chunks = region.chunks;

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  let chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk) {
   chunk = this.DVEW.worldGeneration.getBlankChunk(false);
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
   chunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  const data = this.voxelPaletteFunctions[
   //@ts-ignore
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode
  ](voxelId, voxelStateId, chunk);
  if (data < 0) return;
  this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk.voxels, data);
  if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.data.lightSource && voxel.data.lightValue) {
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }
 }
 /**# Insert Data
  * ---
  * Acts like **setData** but will create a new chunk if it does not exist.
  * @param x
  * @param y
  * @param z
  * @param data
  */
 insertData(x: number, y: number, z: number, data: number) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (x >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return false;
  }

  const chunks = region.chunks;
  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  let chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk) {
   chunk = this.DVEW.worldGeneration.getBlankChunk(false);
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
   this.setChunk(chunkX, chunkY, chunkZ, chunk);
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
   }
  }
  this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk.voxels, data);
 }

 getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false {
  const regionX = (chunkX >> this.regionXPow2) << this.regionXPow2;
  const regionY = (chunkY >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (chunkZ >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return false;
  }

  const chunks = region.chunks;

  if (!chunks[`${chunkX}-${chunkZ}-${chunkY}`]) {
   return false;
  }
  return chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 removeChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const regionX = (chunkX >> this.regionXPow2) << this.regionXPow2;
  const regionY = (chunkY >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (chunkZ >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return false;
  }
  const chunks = region.chunks;
  delete chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData) {
  const regionX = (chunkX >> this.regionXPow2) << this.regionXPow2;
  const regionY = (chunkY >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (chunkZ >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   region = this.addRegion(regionX, regionY, regionZ);
  }
  const chunks = region.chunks;
  chunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk;
 }

 getChunkPosition(x: number, y: number, z: number) {
  return [
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2,
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2,
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2,
  ];
 }

 requestVoxelAdd(
  voxelId: string,
  voxelStateId: string,
  x: number,
  y: number,
  z: number
 ) {
  const regionX = (x >> this.regionXPow2) << this.regionXPow2;
  const regionY = (y >> this.regionYPow2) << this.regionYPow2;
  const regionZ = (z >> this.regionZPow2) << this.regionZPow2;

  let region = this.regions[`${regionX}-${regionZ}-${regionY}`];

  if (!region) {
   return (region = this.addRegion(regionX, regionY, regionZ));
  }

  const chunks = region.chunks;
  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk) return;
  let voxelPalletId = 0;
  if (chunk.palette) {
   const check = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteId(
    chunk,
    voxelId,
    voxelStateId
   );
   if (check) {
    voxelPalletId = check;
   } else {
    const newPaletteId =
     this.DVEW.worldGeneration.voxelPalette.addToChunksVoxelPalette(
      chunk,
      voxelId,
      voxelStateId
     );
    if (!newPaletteId) return;
    voxelPalletId = newPaletteId;
   }
  } else {
   const check =
    this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
     voxelId,
     voxelStateId
    );
   if (check) {
    voxelPalletId = check;
   }
  }
  let light = 0;
  const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
  if (voxel.data.lightSource && voxel.data.lightValue) {
   light = voxel.data.lightValue;
  } else {
   light = this.getLight(x, y, z);
  }
  const voxelData = this.DVEW.worldGeneration.paintVoxel(voxelPalletId);
  this.setData(
   x,
   y,
   z,
   this.lightByte.encodeLightIntoVoxelData(voxelData, light)
  );
  this.addToRebuildQue(x, y, z, "all");
  this.addToRebuildQue(x + 1, y, z, "all");
  this.addToRebuildQue(x - 1, y, z, "all");
  this.addToRebuildQue(x, y + 1, z, "all");
  this.addToRebuildQue(x, y - 1, z, "all");
  this.addToRebuildQue(x, y, z + 1, "all");
  this.addToRebuildQue(x, y, z - 1, "all");

  let needLightUpdate = false;
  if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
   const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
   if (voxel.data.lightSource && voxel.data.lightValue) {
    needLightUpdate = true;
    this._RGBLightUpdateQue.push([x, y, z]);
   }
  }

  if (this.DVEW.engineSettings.settings.updating?.autoRebuild) {
   if (needLightUpdate) {
    this.DVEW.runRGBLightUpdateQue();
    if (this.DVEW.engineSettings.settings.updating?.rebuildMode == "sync") {
     this.DVEW.runChunkRebuildQue();
    } else {
     this.DVEW.runChunkRebuildQueAsync();
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
     this.DVEW.runChunkRebuildQueAsync();
    }
   }
  }

  this.setData(x, y, z, 0);
 }
}
