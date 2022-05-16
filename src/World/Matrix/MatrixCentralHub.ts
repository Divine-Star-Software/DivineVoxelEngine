import { InterCommPortTypes } from "Meta/Comms/InterComm.types";
import { DVEW } from "../DivineVoxelEngineWorld.js";

/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export const MatrixCentralHub = {
 threads: <Record<string, InterCommPortTypes>>{},

 _threadMessageFunctions: <
  Record<string, (data: any, event: MessageEvent) => void>
 >{
  "matrix-sync-chunk": (data, event) => {
   const thread = data[1];
   const chunkX = data[2];
   const chunkY = data[3];
   const chunkZ = data[4];
   MatrixCentralHub.syncChunkInThread(thread, chunkX, chunkY, chunkZ);
  },
  "matrix-release-chunk": (data, event) => {
   const thread = data[1];
   const chunkX = data[2];
   const chunkY = data[3];
   const chunkZ = data[4];
   MatrixCentralHub.releaseChunkInThread(thread, chunkX, chunkY, chunkZ);
  },
  "sync-global-voxel-palette": (data, event) => {
   const thread = data[1];
   MatrixCentralHub.syncGlobalVoxelPaletteInThread(thread);
  },
  "sync-region-voxel-palette": (data, event) => {
   const thread = data[1];
   const regionX = data[2];
   const regionY = data[3];
   const regionZ = data[4];
   MatrixCentralHub.syncRegionVoxelPaletteInThread(
    thread,
    regionX,
    regionY,
    regionZ
   );
  },
  "release-region-voxel-palette": (data, event) => {
   const thread = data[1];
   const regionX = data[2];
   const regionY = data[3];
   const regionZ = data[4];
   MatrixCentralHub.releaseRegionVoxelPaletteInThread(
    thread,
    regionX,
    regionY,
    regionZ
   );
  },
 },

 registerThread(threadId: string, thread: InterCommPortTypes) {
  const channel = new MessageChannel();
  const port = channel.port1;
  thread.postMessage(["set-thread-name", threadId]);
  thread.postMessage(["set-world-port"], [port]);
  this.threads[threadId] = thread;
  channel.port2.onmessage = (event: MessageEvent) => {
   const data = event.data;
   if (data && data[0]) {
    const message = data[0];
    if (this._threadMessageFunctions[message]) {
     this._threadMessageFunctions[message](data, event);
    }
   }
  };
 },

 syncChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const chunkSABs = DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
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
 },

 syncChunkInThread(
  threadId: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  let chunkSABs: SharedArrayBuffer[] = [];

  if (DVEW.matrix.isChunkInMatrix(chunkX, chunkY, chunkZ)) {
   chunkSABs[0] = DVEW.matrix.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`];
   chunkSABs[1] = DVEW.matrix.chunkStatesSAB[`${chunkX}-${chunkZ}-${chunkY}`];
  } else {
   const newChunkSAB = DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
   if (!newChunkSAB) return false;
   chunkSABs = newChunkSAB;
  }


  this.threads[threadId].postMessage([
   "sync-chunk",
   chunkSABs[0],
   chunkSABs[1],
   chunkX,
   chunkY,
   chunkZ,
  ]);
 },

 releaseChunk(chunkX: number, chunkY: number, chunkZ: number) {
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "release-chunk",
    chunkX,
    chunkY,
    chunkZ,
   ]);
  }
 },

 releaseChunkInThread(
  threadId: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  this.threads[threadId].postMessage(["release-chunk", chunkX, chunkY, chunkZ]);
 },

 syncGlobalVoxelPalette() {
  const globalVoxelPalette =
   DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
  const globalVoxelPaletteRecord =
   DVEW.worldGeneration.voxelPalette.getGlobalVoxelPaletteRecord();
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-global-palette",
    globalVoxelPalette,
    globalVoxelPaletteRecord,
   ]);
  }
 },

 syncGlobalVoxelPaletteInThread(threadId: string) {
  const globalVoxelPalette =
   DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
  const globalVoxelPaletteRecord =
   DVEW.worldGeneration.voxelPalette.getGlobalVoxelPaletteRecord();
  this.threads[threadId].postMessage([
   "sync-global-palette",
   globalVoxelPalette,
   globalVoxelPaletteRecord,
  ]);
 },

 syncRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  const region = DVEW.worldData.getRegion(regionX, regionY, regionZ);
  if (!region) return false;
  const regionVoxelPalette = region.palette;
  if (!regionVoxelPalette) return false;
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-region-data",
    regionVoxelPalette,
    regionX,
    regionY,
    regionZ,
   ]);
  }
 },

 syncRegionVoxelPaletteInThread(
  threadId: string,
  regionX: number,
  regionY: number,
  regionZ: number
 ) {
  const region = DVEW.worldData.getRegion(regionX, regionY, regionZ);
  if (!region) return false;
  const regionVoxelPalette = region.palette;
  if (!regionVoxelPalette) return false;
  this.threads[threadId].postMessage([
   "sync-region-data",
   regionVoxelPalette,
   regionX,
   regionY,
   regionZ,
  ]);
 },

 releaseRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "release-region-palette",
    regionX,
    regionY,
    regionZ,
   ]);
  }
 },

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
 },
};
