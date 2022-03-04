import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";

import { Flat3DArray } from "../Util/Flat3DArray.js";
import { ChunkBounds } from "../Chunks/ChunkBounds.js";

/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export class WorldMatrix implements ChunkBound {
 _3dArray = new Flat3DArray();
 chunkBounds = new ChunkBounds();

 chunks: Record<string, Uint32Array> = {};
 constructor() {}

 syncChunkBounds(): void {
  this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
 }

 setChunk(chunkX: number, chunkY: number, chunkZ: number, data: Uint32Array) {
  this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = data;
 }

 getChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return false;
  return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
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
