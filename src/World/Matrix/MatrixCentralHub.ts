import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";

/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export class MatrixCentralHub {
 threads: Record<string, Worker | MessagePort> = {};

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 registerThread(threadId: string, thread: Worker | MessagePort) {
  this.threads[threadId] = thread;
 }

 syncChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const chunkSABs = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
  if (!chunkSABs) return false;
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-chunk",
    chunkSABs[0],
    chunkSABs[1],
    chunkX,
    chunkY,
    chunkZ,
   ]);
  }
 }

 syncChunkInThread(
  threadId: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  const chunkSABs = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
  if (!chunkSABs) return false;
  this.threads[threadId].postMessage([
   "sync-chunk",
   chunkSABs[0],
   chunkSABs[1],
   chunkX,
   chunkY,
   chunkZ,
  ]);
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

 syncGlobalVoxelPalette() {
  const globalVoxelPalette =
   this.DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-global-palette",
    globalVoxelPalette,
   ]);
  }
 }

 syncGlobalVoxelPaletteInThread(threadId: string) {
  const globalVoxelPalette =
   this.DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
  this.threads[threadId].postMessage([
   "sync-global-palette",
   globalVoxelPalette,
  ]);
 }

 syncRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  const region = this.DVEW.worldData.getRegion(regionX, regionY, regionZ);
  if (!region) return false;
  const regionVoxelPalette = region.palette;
  if (!regionVoxelPalette) return false;
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-region-palette",
    regionVoxelPalette,
    regionX,
    regionY,
    regionZ,
   ]);
  }
 }

 syncRegionVoxelPaletteInThread(
  threadId: string,
  regionX: number,
  regionY: number,
  regionZ: number
 ) {
  const region = this.DVEW.worldData.getRegion(regionX, regionY, regionZ);
  if (!region) return false;
  const regionVoxelPalette = region.palette;
  if (!regionVoxelPalette) return false;
  this.threads[threadId].postMessage([
   "sync-region-palette",
   regionVoxelPalette,
   regionX,
   regionY,
   regionZ,
  ]);
 }

 releaseRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "release-region-palette",
    regionX,
    regionY,
    regionZ,
   ]);
  }
 }

 releaseRegionVoxelPaletteInThread(
  threadId: string,
  regionX: number,
  regionY: number,
  regionZ: number
 ) {
  this.threads[threadId].postMessage([
   "release-region-palette",
   regionX,
   regionY,
   regionZ,
  ]);
 }
}
