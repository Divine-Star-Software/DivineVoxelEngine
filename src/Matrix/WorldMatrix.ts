import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import { Flat3DArray } from "../Global/Util/Flat3DArray.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { VoxelByte } from "../Global/Util/VoxelByte.js";

/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export class WorldMatrix implements ChunkBound {
 _3dArray = new Flat3DArray();
 chunkBounds = new ChunkBounds();
 voxelByte = new VoxelByte();

 //two minutes
 updateDieTime = 120000;

 regionXPow2 = 9;
 regionZPow2 = 9;
 regionYPow2 = 8;

 chunks: Record<string, Uint32Array> = {};
 chunkStates: Record<string, Uint8Array> = {};

 paletteMode = 0;
 globalVoxelPalette: Record<number, string> = {};
 regionVoxelPalettes: Record<string, Record<number, string>> = {};

 constructor() {}

 syncChunkBounds(): void {
  this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
 }

 __setGlobalVoxelPalette(palette: Record<number, string>) {
  this.globalVoxelPalette = palette;
 }

 __setRegionVoxelPalette(
  regionX: number,
  regionY: number,
  regionZ: number,
  palette: Record<number, string>
 ) {
  this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`] = palette;
 }

 __removeRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  if (!this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`])
   return false;
  delete this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`];
 }

 getVoxel(x: number, y: number, z: number) {
  let palette = this.globalVoxelPalette;

  if (this.paletteMode == 1) {
   const regionX = (x >> this.regionXPow2) << this.regionXPow2;
   const regionY = (y >> this.regionYPow2) << this.regionYPow2;
   const regionZ = (z >> this.regionZPow2) << this.regionZPow2;
   palette = this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`];
  }

  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];

  if (!chunk) {
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
  const voxelData = this._3dArray.getValue(voxelX, voxelY, voxelZ, chunk);
  const voxelId = this.voxelByte.getId(voxelData);
  if (voxelId == 0) return "dve:air";
  return palette[voxelId];
 }

 /**# Set Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __setChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  chunkSAB: SharedArrayBuffer,
  chunkStateSAB: SharedArrayBuffer
 ) {
  this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = new Uint32Array(chunkSAB);
  this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`] = new Uint8Array(
   chunkStateSAB
  );
 }

 /**# Remove Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __removeChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  delete this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 getChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 isChunkLocked(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  return (
   Atomics.load(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0) == 1
  );
 }

 lockChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  Atomics.store(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0, 1);
  return true;
 }

 unLockChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  Atomics.store(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0, 0);
  return true;
 }

 updateChunkData(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  run: (chunk: Uint32Array) => {}
 ): false | Promise<boolean> {
  const chunk = this.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) {
   return false;
  }
  const prom: Promise<boolean> = new Promise((resolve, reject) => {
   if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
    this.lockChunk(chunkX, chunkY, chunkZ);
    run(chunk);
    this.unLockChunk(chunkX, chunkY, chunkZ);
    resolve(true);
   } else {
    const inte = setInterval(() => {
     if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
      this.lockChunk(chunkX, chunkY, chunkZ);
      run(chunk);
      this.unLockChunk(chunkX, chunkY, chunkZ);
      resolve(true);
     }
    }, 1);
    setTimeout(() => {
     clearInterval(inte);
     resolve(false);
    }, this.updateDieTime);
   }
  });
  return prom;
 }

 setData(x: number, y: number, z: number, data: number) {
  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];

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
  this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk, data);
 }

 getData(x: number, y: number, z: number, value: number) {
  const chunkX =
   (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  const chunkY =
   (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
  const chunkZ =
   (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];

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
  return this._3dArray.getValue(voxelX, voxelY, voxelZ, chunk);
 }
}
