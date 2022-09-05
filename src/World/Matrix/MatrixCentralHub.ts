import { Util } from "../../Global/Util.helper.js";
import type { InterCommPortTypes } from "Meta/Comms/InterComm.types";
import { DVEW } from "../DivineVoxelEngineWorld.js";

/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export const MatrixCentralHub = {
 chunkReader: Util.getChunkReader(),
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
  "matrix-load-chunk": (data, event) => {
   const thread = data[1];
   const chunkX = data[2];
   const chunkY = data[3];
   const chunkZ = data[4];
   if (!DVEW.worldData.getChunk(chunkX, chunkY, chunkZ)) {
    DVEW.worldData.addChunk(chunkX, chunkY, chunkZ);
   }
   MatrixCentralHub.syncChunkInThread(thread, chunkX, chunkY, chunkZ);
  },
  "matrix-release-chunk": (data, event) => {
   const thread = data[1];
   const chunkX = data[2];
   const chunkY = data[3];
   const chunkZ = data[4];
   MatrixCentralHub.releaseChunkInThread(thread, chunkX, chunkY, chunkZ);
  },
  "sync-voxel-palette": (data, event) => {
   const thread = data[1];
   MatrixCentralHub.syncVoxelPaletteInThread(thread);
  },
 },

 registerThread(threadId: string, thread: InterCommPortTypes) {
  const channel = new MessageChannel();
  const port = channel.port1;
  thread.postMessage(["set-thread-name", threadId]);
  thread.postMessage(["set-world-port", port], [port]);
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

 syncChunk(x: number, y: number, z: number) {
  let chunkSABs: SharedArrayBuffer[] = [];
  if (DVEW.matrix.isChunkInMatrix(x, y, z)) {
   const data = DVEW.matrix.getMatrixChunkSAB(x, y, z);
   if (!data) return false;
   chunkSABs = data;
  } else {
   const newChunkSAB = DVEW.matrix.createMatrixChunkSAB(x, y, z);
   if (!newChunkSAB) return false;
   chunkSABs = newChunkSAB;
  }
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-chunk",
    chunkSABs[0],
    chunkSABs[1],
    x,
    y,
    z,
   ]);
  }
 },

 syncChunkInThread(threadId: string, x: number, y: number, z: number) {
  let chunkSABs: SharedArrayBuffer[] = [];
  if (DVEW.matrix.isChunkInMatrix(x, y, z)) {
   const data = DVEW.matrix.getMatrixChunkSAB(x, y, z);
   if (!data) return false;
   chunkSABs = data;
  } else {
   const newChunkSAB = DVEW.matrix.createMatrixChunkSAB(x, y, z);
   if (!newChunkSAB) return false;
   chunkSABs = newChunkSAB;
  }
  this.threads[threadId].postMessage([
   "sync-chunk",
   chunkSABs[0],
   chunkSABs[1],
   x,
   y,
   z,
  ]);
 },

 releaseChunk(x: number, y: number, z: number) {
  const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "release-chunk",
    chunkPOS.x,
    chunkPOS.y,
    chunkPOS.z,
   ]);
  }
 },

 releaseChunkInThread(threadId: string, x: number, y: number, z: number) {
  const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
  this.threads[threadId].postMessage([
   "release-chunk",
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z,
  ]);
 },

 syncRegion(x: number, y: number, z: number) {
  const region = DVEW.worldData.getRegion(x, y, z);
  if (!region) return false;
  let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
  if (!matrixRegionData) {
   matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
  }
  for (const worldColumnKeys of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKeys];
   for (const chunkKey of Object.keys(worldColumn)) {
    const chunk = worldColumn[chunkKey];
    const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
    for (const threadId of Object.keys(this.threads)) {
     this.syncChunkInThread(threadId, chunkPOS.x, chunkPOS.y, chunkPOS.z);
    }
   }
  }
 },

 syncRegionInThread(threadId: string, x: number, y: number, z: number) {
  const region = DVEW.worldData.getRegion(x, y, z);
  if (!region) return false;
  let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
  if (!matrixRegionData) {
   matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
  }
  for (const worldColumnKeys of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKeys];
   for (const chunkKey of Object.keys(worldColumn)) {
    const chunk = worldColumn[chunkKey];
    const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
    this.syncChunkInThread(threadId, chunkPOS.x, chunkPOS.y, chunkPOS.z);
   }
  }
 },

 releaseRegion(x: number, y: number, z: number) {
  const region = DVEW.worldData.getRegion(x, y, z);
  if (!region) return false;
  let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
  if (!matrixRegionData) {
   matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
  }
  for (const worldColumnKeys of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKeys];
   for (const chunkKey of Object.keys(worldColumn)) {
    const chunk = worldColumn[chunkKey];
    const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
    for (const threadId of Object.keys(this.threads)) {
     this.releaseChunkInThread(threadId, chunkPOS.x, chunkPOS.y, chunkPOS.z);
    }
   }
  }
  DVEW.matrix.removeRegionFromMatrix(x, y, z);
 },

 releaseRegionInThread(threadId: string, x: number, y: number, z: number) {
  const region = DVEW.worldData.getRegion(x, y, z);
  if (!region) return false;
  let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
  if (!matrixRegionData) {
   matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
  }
  delete matrixRegionData.threadsLoadedIn[threadId];
  for (const worldColumnKeys of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKeys];
   for (const chunkKey of Object.keys(worldColumn)) {
    const chunk = worldColumn[chunkKey];
    const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
    this.releaseChunkInThread(threadId, chunkPOS.x, chunkPOS.y, chunkPOS.z);
   }
  }
 },

 syncVoxelPalette() {
  const globalVoxelPalette =
   DVEW.worldGeneration.voxelPalette.getVoxelPalette();
  const gloablVoxelPaletteMap =
   DVEW.worldGeneration.voxelPalette.getVoxelPaletteMap();
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-voxel-palette",
    globalVoxelPalette,
    gloablVoxelPaletteMap,
   ]);
  }
 },

 syncVoxelPaletteInThread(threadId: string) {
  const globalVoxelPalette =
   DVEW.worldGeneration.voxelPalette.getVoxelPalette();
  const gloablVoxelPaletteMap =
   DVEW.worldGeneration.voxelPalette.getVoxelPaletteMap();
  this.threads[threadId].postMessage([
   "sync-voxel-palette",
   globalVoxelPalette,
   gloablVoxelPaletteMap,
  ]);
 },

 syncVoxelData() {
  const voxelBuffer = DVEW.voxelMatrix.voxelBuffer;
  const voxelMapBuffer = DVEW.voxelMatrix.voxelMapBuffer;
  for (const threadId of Object.keys(this.threads)) {
   this.threads[threadId].postMessage([
    "sync-voxel-data",
    voxelBuffer,
    voxelMapBuffer,
   ]);
  }
 },

 syncVoxelDataInThread(threadId: string) {
  const voxelBuffer = DVEW.voxelMatrix.voxelBuffer;
  const voxelMapBuffer = DVEW.voxelMatrix.voxelMapBuffer;
  this.threads[threadId].postMessage([
   "sync-voxel-data",
   voxelBuffer,
   voxelMapBuffer,
  ]);
 },
};
