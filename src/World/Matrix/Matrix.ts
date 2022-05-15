import type { ChunkData } from "Meta/Chunks/Chunk.types";
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { Util } from "../../Global/Util.helper.js";

/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export const Matrix = {
 //two minutes
 updateDieTime: 120000,
 worldBounds: Util.getWorldBounds(),
 loadedChunks: <Record<string, SharedArrayBuffer>>{},
 loadedRegions: <Record<string, Record<string, boolean>>>{},
 chunkStatesSAB: <Record<string, SharedArrayBuffer>>{},
 //A view of the chunk states SAB. The states are used to define if the chunk is 'locked' or not.
 chunkStates: <Record<string, Uint8Array>>{},

 isChunkInMatrix(x: number, y: number, z: number) {
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  return this.loadedChunks[chunkKey] !== undefined;
 },

 isChunkLocked(x: number, y: number, z: number) {
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.chunkStates[chunkKey]) return false;
  return Atomics.load(this.chunkStates[chunkKey], 0) == 1;
 },

 lockChunk(x: number, y: number, z: number) {
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.chunkStates[chunkKey]) return false;
  Atomics.store(this.chunkStates[chunkKey], 0, 1);
  return true;
 },

 unLockChunk(x: number, y: number, z: number) {
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.chunkStates[chunkKey]) return false;
  Atomics.store(this.chunkStates[chunkKey], 0, 0);
  return true;
 },

 updateChunkData(
  x: number,
  y: number,
  z: number,
  run: (chunk: ChunkData) => {}
 ): false | Promise<boolean> {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) {
   return false;
  }
  if (!this.isChunkInMatrix(x, y, z)) {
   run(chunk);
  }
  const prom: Promise<boolean> = new Promise((resolve, reject) => {
   if (!this.isChunkLocked(x, y, z)) {
    this.lockChunk(x, y, z);
    run(chunk);
    this.unLockChunk(x, y, z);
    resolve(true);
   } else {
    const inte = setInterval(() => {
     if (!this.isChunkLocked(x, y, z)) {
      this.lockChunk(x, y, z);
      run(chunk);
      this.unLockChunk(x, y, z);
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
 },

 releaseChunk(x: number, y: number, z: number) {
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.loadedChunks[chunkKey]) return;
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) return false;
  delete this.loadedChunks[chunkKey];
  return true;
 },

 createChunkSAB(x: number, y: number, z: number): SharedArrayBuffer[] | false {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) return false;
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  const chunkStateSAB = new SharedArrayBuffer(1);
  this.loadedChunks[chunkKey] = chunk.voxelsSAB;

  this.chunkStates[chunkKey] = new Uint8Array(chunkStateSAB);
  this.chunkStatesSAB[chunkKey] = chunkStateSAB;
  return [chunk.voxelsSAB, chunkStateSAB];
 },
};
