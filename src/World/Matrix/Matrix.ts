import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import type { ChunkBounds } from "Global/Chunks/ChunkBounds";

/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export class Matrix {
 loadedChunks: Record<string, SharedArrayBuffer> = {};
 chunkBounds: ChunkBounds;
 constructor(private DVEW: DivineVoxelEngineWorld) {}

 releaseChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`]) return;
  const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  const voxels: number[] = [];
  const length = chunk.voxels.length;
  const chunkSABView = chunk.voxels;
  let i = length;
  while (i--) {
   voxels[i] = chunkSABView[i];
  }
  chunk.voxels = voxels;
  delete this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`];
  return true;
 }

 createChunkSAB(chunkX: number, chunkY: number, chunkZ: number) {
  const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  const length = chunk.voxels.length;
  const chunkSAB = new SharedArrayBuffer(length * 4);
  const chunkSABView = new Uint32Array(chunkSAB);
  let i = length;
  while (i--) {
   chunkSABView[i] = chunk.voxels[i];
  }
  this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunkSAB;
  chunk.voxels = chunkSABView;
  return chunkSAB;
 }
}
