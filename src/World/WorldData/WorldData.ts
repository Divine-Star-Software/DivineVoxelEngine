import type { ChunkVoxels, ChunkData } from "Meta/Chunks/Chunk.types";
import {
 GetRelativeVoxelData,
 GetVoxelData,
} from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { InfoByte } from "Global/Util/InfoByte.js";
import { LightByte } from "Global/Util/LightByte.js";
import { VoxelSunLightMixCalc } from "./Functions/CalculateVoxelSunLight.js";
import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";

export class WorldData {
 renderDistance = 20;

 chunkXPow2 = 4;
 chunkZPow2 = 4;
 chunkYPow2 = 7;

 chunks: Record<string, ChunkData> = {};
 getVoxelData = GetVoxelData;
 getRelativeVoxelData = GetRelativeVoxelData;
 calculdateVoxelLight = CalculateVoxelLight;
 voxelRGBLightMixCalc = VoxelLightMixCalc;
 voxelSunLightMixCalc = VoxelSunLightMixCalc;

 infoByte: InfoByte;
 lightByte: LightByte;

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

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }



 getCurrentWorldDataSize() {
  const data = JSON.stringify(this.chunks);
  return new Blob([data]).size;
 }
 getCurrentWorldDataString() {
  return JSON.stringify(this.chunks);
 }
 setLight(x: number, y: number, z: number, lightValue: number) {
  const voxel = this.getVoxel(x, y, z);
  if (voxel) {
   if (voxel[0] == -1) {
    voxel[1][voxel[1].length - 1] = lightValue;
   } else {
    if (voxel[0].data.substance == "solid") {
     return false;
    } else {
     const voxelInterface: VoxelInteface = voxel[0];
     if (voxelInterface.data.lightSource && voxelInterface.data.lightValue) {
      return false;
     }
     voxel[2][voxel[2].length - 1] = lightValue;
    }
   }
  }
  return true;
 }
 getLight(x: number, y: number, z: number): number {
  const voxel = this.getVoxel(x, y, z);
  if (voxel) {
   if (voxel[0] == -1) {
    return voxel[1][voxel[1].length - 1];
   } else {
    const voxelInterface: VoxelInteface = voxel[0];
    if (voxelInterface.data.lightSource && voxelInterface.data.lightValue) {
     return voxelInterface.data.lightValue;
    }
    if (voxelInterface.data.substance == "solid") {
     return 0;
    }
    return voxel[2][voxel[2].length - 1];
   }
  }
  return 0;
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
  voxelData: any[],
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
  voxelData: any[],
  x: number,
  y: number,
  z: number
 ) {
  if (voxelData[0] < 0) return true;

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
  const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
  const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
  const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkYPow2) - 1;
   }
  }
  if (
   chunk.voxels[voxelX] &&
   chunk.voxels[voxelX][voxelZ] &&
   chunk.voxels[voxelX][voxelZ][voxelY]
  ) {
   delete chunk.voxels[voxelX][voxelZ][voxelY];
  } else {
   return false;
  }
 }

 getVoxel(x: number, y: number, z: number) {
  const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
  const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
  const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];

  if (!chunk || chunk.isEmpty) {
   return false;
  }

  let globalPalette = true;
  if (chunk.palette) {
   globalPalette = false;
  }

  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkYPow2) - 1;
   }
  }
  if (
   chunk.voxels[voxelX] &&
   chunk.voxels[voxelX][voxelZ] &&
   chunk.voxels[voxelX][voxelZ][voxelY]
  ) {
   const voxelData = chunk.voxels[voxelX][voxelZ][voxelY];
   const voxelId = voxelData[0];
   if (voxelId == -1) {
    return [-1, voxelData];
   } else {
    let voxelTrueID: string = "";
    let voxelState: string = "";
    if (globalPalette) {
     const check =
      this.DVEW.worldGeneration.getVoxelDataFromGlobalPalette(voxelId);
     if (check) {
      voxelTrueID = check[0];
      voxelState = check[1];
     } else {
      return false;
     }
    } else {
     const check = this.DVEW.worldGeneration.voxelPaletteHelper.getVoxelData(
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
  const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
  const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
  const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkYPow2) - 1;
   }
  }
  if (
   chunk.voxels[voxelX] &&
   chunk.voxels[voxelX][voxelZ] &&
   chunk.voxels[voxelX][voxelZ][voxelY]
  ) {
   return chunk.voxels[voxelX][voxelZ][voxelY];
  } else {
   return false;
  }
 }

 _copy(data: any) {
  return [...data];
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
 setData(x: number, y: number, z: number, data: number[]) {
  const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
  const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
  const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk || chunk.isEmpty) {
   return false;
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkYPow2) - 1;
   }
  }
  const voxels = chunk.voxels;
  voxels[voxelX] ??= [];
  voxels[voxelX][voxelZ] ??= [];
  voxels[voxelX][voxelZ][voxelY] = this._copy(data);
 }
 /**# Insert Data
  * ---
  * Acts like **setData** but will create a new chunk if it does not exist.
  * @param x
  * @param y
  * @param z
  * @param data
  */
 insertData(x: number, y: number, z: number, data: number[]) {
  const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
  const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
  const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
  let chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  if (!chunk) {
   chunk = this.DVEW.worldGeneration.getBlankChunk(false);
   this.setChunk(chunkX, chunkY, chunkZ, chunk);
  }
  let voxelX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
    voxelX = (1 << this.chunkXPow2) - 1;
   }
  }
  let voxelZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
    voxelZ = (1 << this.chunkZPow2) - 1;
   }
  }
  let voxelY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
    voxelY = (1 << this.chunkYPow2) - 1;
   }
  }
  const voxels = chunk.voxels;
  voxels[voxelX] ??= [];
  voxels[voxelX][voxelZ] ??= [];
  voxels[voxelX][voxelZ][voxelY] = this._copy(data);
 }

 getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false {
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) {
   return false;
  }
  return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 removeChunk(chunkX: number, chunkY: number, chunkZ: number) {
  delete this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData) {
  this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk;
 }

 getChunkPosition(x: number, y: number, z: number) {
  return [
   (x >> this.chunkXPow2) << this.chunkXPow2,
   (y >> this.chunkYPow2) << this.chunkYPow2,
   (z >> this.chunkXPow2) << this.chunkXPow2,
  ];
 }

 requestVoxelAdd(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number,
  voxelPaletteId: number = 1
 ): false | ChunkVoxels {
  /*  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  const relativePOS = this._getRelativeChunkPosition(
   chunkX,
   chunkY,
   chunkZ,
   x,
   y,
   z
  );
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];
  const relativeY = relativePOS[2];
  const chunkVoxels = chunk.voxels;
  let palette = chunk.voxelPalette;
  if (!palette) {
   palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
  }
  if (!chunkVoxels[relativeX][relativeZ]) {
   chunkVoxels[relativeX][relativeZ] ??= [];
   chunkVoxels[relativeX][relativeZ][relativeY] = [
    voxelPaletteId,
    0,
    0xffffffff,
   ];

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    chunkX,
    chunkY,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );
  } else if (!chunkVoxels[relativeX][relativeZ][relativeY]) {
   chunkVoxels[relativeX][relativeZ][relativeY] = [
    voxelPaletteId,
    0,
    0xffffffff,
   ];
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    chunkX,
    chunkY,
    chunkZ
   );

   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );
  }
 */
  return false;
 }

 /*  _checkNearbyChunksToRebuild(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  relativeX: number,
  relativeZ: number
 ) {
  let updated = false;
  buildChunkX0: if (relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15: if (relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkZ0: if (relativeZ == 0) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkZ0;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkZ15: if (relativeZ == 15) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkZ15;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z15: if (relativeZ == 15 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15Z15;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z0: if (relativeZ == 0 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0Z0;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z0: if (relativeZ == 0 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15Z0;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z15: if (relativeZ == 15 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0Z15;
   let palette = chunk.voxelPalette;
   if (!palette) {
    palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  if (updated) {
   this.DVEW.buildFluidMesh();
  }
 }
 */
 _getRelativeChunkPosition(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  let relativeX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + 15) {
    relativeX = 15;
   }
  }
  let relativeZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + 15) {
    relativeZ = 15;
   }
  }
  let realtiveY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + 127) {
    realtiveY = 127;
   }
  }

  return [relativeX, relativeZ, realtiveY];
 }

 requestVoxelBeRemove(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ): false | ChunkVoxels {
  /*  const chunk = this.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;

  const relativePOS = this._getRelativeChunkPosition(
   chunkX,
   chunkY,
   chunkZ,
   x,
   y,
   z
  );
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];
  const relativeY = relativePOS[2];
  const chunkVoxels = chunk.voxels;
  let palette = chunk.voxelPalette;
  if (!palette) {
   palette = this.DVEW.worldGeneration.getGlobalVoxelPalette();
  }

  if (!chunkVoxels[relativeX]) return false;
  if (!chunkVoxels[relativeX][relativeZ]) return false;
  if (chunkVoxels[relativeX][relativeZ][relativeY]) {
   delete chunkVoxels[relativeX][relativeZ][relativeY];

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    palette,
    chunkX,
    chunkY,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this.DVEW.buildFluidMesh();

   return chunkVoxels;
  } else {
   return false;
  } */
  return false;
 }
}
