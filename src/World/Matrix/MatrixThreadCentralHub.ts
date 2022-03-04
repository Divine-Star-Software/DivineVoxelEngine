import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";

/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export class MatrixThreadCentralHub {

 threads: Record<string, Worker | MessagePort> = {};

 constructor(private DVEW: DivineVoxelEngineWorld) {}
 
 registerThread(threadId: string, thread: Worker | MessagePort) {
  this.threads[threadId] = thread;
 }

 syncChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const chunkSAB = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
  if (!chunkSAB) return false;
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage(["sync-chunk", chunkSAB]);
  }
 }

 syncChunkInThread(
  threadId: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  const chunkSAB = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
  if (!chunkSAB) return false;
  this.threads[threadId].postMessage(["sync-chunk", chunkSAB]);
 }

 releaseChunk(chunkX: number, chunkY: number, chunkZ: number) {
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "release-chunk",
    chunkX,
    chunkY,
    chunkZ,
   ]);
  }
 }

 releaseChunkInThread(
  threadId: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  this.threads[threadId].postMessage(["release-chunk", chunkX, chunkY, chunkZ]);
 }
}
