import type { Flat3DArray } from "Global/Util/Flat3DArray";
import { PositionMatrix } from "Meta/Util.types";

/**# World Bounds
 * ---
 * This holds the data for the size of chunks, regions, and the world.
 * It also handles the calcuation of chunks, regions, and relative voxel positions.
 * A refernce is held to all classes that need it.
 */
export const WorldBounds = {
 chunkXPow2: 4,
 chunkYPow2: 7,
 chunkZPow2: 4,

 chunkXSize: 16,
 chunkYSize: 128,
 chunkZSize: 16,

 chunkTotalVoxels: 16 * 128 * 16,

 regionXPow2: 9,
 regionYPow2: 7,
 regionZPow2: 9,

 regionXSize: 512,
 regionYSize: 128,
 regionZSize: 512,

 __regionPosition: { x: 0, y: 0, z: 0 },
 __chunkPosition: { x: 0, y: 0, z: 0 },
 __voxelPosition: { x: 0, y: 0, z: 0 },

 syncBoundsWithFlat3DArray(flat3dArray: typeof Flat3DArray) {
  flat3dArray.setBounds(this.chunkXSize, this.chunkYSize, this.chunkZSize);
 },
 setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number) {
  this.chunkXPow2 = pow2X;
  this.chunkXSize = 2 ** pow2X;

  this.chunkYPow2 = pow2Y;
  this.chunkYSize = 2 ** pow2Y;

  this.chunkZPow2 = pow2Z;
  this.chunkZSize = 2 ** pow2Z;

  this.chunkTotalVoxels = this.chunkXSize * this.chunkYSize * this.chunkZSize;
 },
 setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number) {
  this.regionXPow2 = pow2X;
  this.regionXSize = 2 ** pow2X;

  this.regionYPow2 = pow2Y;
  this.regionYSize = 2 ** pow2Y;

  this.regionZPow2 = pow2Z;
  this.regionZSize = 2 ** pow2Z;
 },
 getRegionPosition(x: number, y: number, z: number) {
  this.__regionPosition.x = (x >> this.regionXPow2) << this.regionXPow2;
  this.__regionPosition.y = (y >> this.regionYPow2) << this.regionYPow2;
  this.__regionPosition.z = (z >> this.regionZPow2) << this.regionZPow2;
  return this.__regionPosition;
 },
 getChunkPosition(x: number, y: number, z: number) {
  this.__chunkPosition.x = (x >> this.chunkXPow2) << this.chunkXPow2;
  this.__chunkPosition.y = (y >> this.chunkYPow2) << this.chunkYPow2;
  this.__chunkPosition.z = (z >> this.chunkZPow2) << this.chunkZPow2;
  return this.__chunkPosition;
 },
 getChunkKey(chunkPOS: PositionMatrix) {
  return `${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`;
 },
 getChunkKeyFromPosition(x: number, y: number, z: number) {
  const chunkPOS = this.getChunkPosition(x, y, z);
  return `${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`;
 },
 getRegionKey(regionPOS: PositionMatrix) {
  return `${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`;
 },
 getRegionKeyFromPosition(x: number, y: number, z: number) {
  const regionPOS = this.getRegionPosition(x, y, z);
  return `${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`;
 },
 /**# Get Voxel Position From Chunk Position
  * ---
  * Returns the x/y/z index of the voxel in the chunk.
  * Used to find actual index in the chunk array.
  */
 getVoxelPositionFromChunkPosition(
  x: number,
  y: number,
  z: number,
  chunkPOS: PositionMatrix
 ) {
  this.__voxelPosition.x = Math.abs(x - chunkPOS.x);
  if (x < 0) {
   if (x == chunkPOS.x + ((1 << this.chunkXPow2) - 1)) {
    this.__voxelPosition.x = (1 << this.chunkXPow2) - 1;
   }
  }
  this.__voxelPosition.z = Math.abs(z - chunkPOS.z);
  if (z < 0) {
   if (z == chunkPOS.z + ((1 << this.chunkZPow2) - 1)) {
    this.__voxelPosition.z = (1 << this.chunkZPow2) - 1;
   }
  }
  this.__voxelPosition.y = Math.abs(y - chunkPOS.y);
  if (y < 0) {
   if (y == chunkPOS.y + ((1 << this.chunkYPow2) - 1)) {
    this.__voxelPosition.y = (1 << this.chunkYPow2) - 1;
   }
  }
  return this.__voxelPosition;
 },
 getVoxelPosition(x: number, y: number, z: number) {
  return this.getVoxelPositionFromChunkPosition(
   x,
   y,
   z,
   this.getChunkPosition(x, y, z)
  );
 },
};