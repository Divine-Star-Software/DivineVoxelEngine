import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export class Matrix {
 //two minutes
 updateDieTime = 120000;

 loadedChunks: Record<string, SharedArrayBuffer> = {};
 loadedRegions: Record<string, Record<string, boolean>> = {};
 chunkStatesSAB: Record<string, SharedArrayBuffer> = {};
 //A view of the chunk states SAB. The states are used to define if the chunk is 'locked' or not.
 chunkStates: Record<string, Uint8Array> = {};

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 isChunkInMatrix(chunkX: number, chunkY: number, chunkZ: number) {
  return this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] !== undefined;
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
  run: (chunk: ChunkData) => {}
 ): false | Promise<boolean> {
  const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) {
   return false;
  }
  if (!this.isChunkInMatrix(chunkX, chunkY, chunkZ)) {
   run(chunk);
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

 releaseChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`]) return;
  const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
/*   const voxels: number[] = [];
  const length = chunk.voxels.length;
  const chunkSABView = chunk.voxels;
  let i = length;
  while (i--) {
   voxels[i] = chunkSABView[i];
  }
  chunk.voxels = voxels; */
  delete this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`];
  return true;
 }

 createChunkSAB(
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): SharedArrayBuffer[] | false {
  const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  const chunkStateSAB = new SharedArrayBuffer(1);
  this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk.voxelsSAB;

  this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`] = new Uint8Array(
   chunkStateSAB
  );
  this.chunkStatesSAB[`${chunkX}-${chunkZ}-${chunkY}`] = chunkStateSAB;
  return [chunk.voxelsSAB, chunkStateSAB];
 }
}
