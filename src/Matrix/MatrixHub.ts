import { InterCommPortTypes } from "Meta/Comms/InterComm.types.js";
import { WorldMatrix } from "./WorldMatrix.js";

/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export const MatrixHub = {
 messageFunctions: <
  Record<string, (data: any, event: MessageEvent) => any | void>
 >{
  "sync-chunk": (data) => {
   MatrixHub._syncChunk(data);
  },
  "release-chunk": (data) => {
   MatrixHub._releaseChunk(data);
  },
  "sync-global-palette": (data) => {
  
   MatrixHub._syncGlobalVoxelPalette(data);
  },
  "set-thread-name": (data) => {
   MatrixHub._setThreadName(data);
  },
  "set-world-port": (data, event) => {
   const port = event.ports[0];
   MatrixHub._setWorldPort(port);
  },
 },

 worldPort: <InterCommPortTypes | undefined>undefined,

 threadName: "",
 setThreadName(threadName: string) {
  this.threadName = threadName;
  WorldMatrix.threadName = this.threadName;
 },
 onMessage(event: MessageEvent, runAfter: (event: MessageEvent) => any | void) {
  const data = event.data;
  if (!data || !data[0]) return;
  const message = data[0];

  if (this.messageFunctions[message]) {
   this.messageFunctions[message](data, event);
   return;
  }

  runAfter(event);
 },

 /**# Request Chunk Sync
  *
  * Will sync a chunk if it exists.
  *
  */
 async requestChunkSync(x: number, y: number, z: number) {
  if (!this.worldPort) return;
  const chunkPOS = WorldMatrix.worldBounds.getChunkPosition(x, y, z);
  this.worldPort.postMessage([
   "matrix-sync-chunk",
   this.threadName,
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z,
  ]);
  return await WorldMatrix.awaitChunkLoad(chunkPOS.x, chunkPOS.y, chunkPOS.z);
 },

 /**# Request Chunk Load
  *
  * Will sync a chunk if it exists.
  *
  */
 async requestChunkLoad(x: number, y: number, z: number) {
  if (!this.worldPort) return;
  const chunkPOS = WorldMatrix.worldBounds.getChunkPosition(x, y, z);
  this.worldPort.postMessage([
   "matrix-load-chunk",
   this.threadName,
   chunkPOS.x,
   chunkPOS.y,
   chunkPOS.z,
  ]);
  return await WorldMatrix.awaitChunkLoad(chunkPOS.x, chunkPOS.y, chunkPOS.z);
 },

 requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.worldPort) return;
  this.worldPort.postMessage([
   "matrix-release-chunk",
   this.threadName,
   chunkX,
   chunkY,
   chunkZ,
  ]);
 },

 _setWorldPort(port: MessagePort) {
  this.worldPort = port;
  this.worldPort.onmessage = (event) => {
   console.log(event);
  };
 },

 _syncChunk(data: any[]) {
  const voxelsSAB = data[1];
  const voxelStatesSAB = data[2];
  const heightMapSAB = data[3];
  const minMaxMapSAB = data[4];
  const chunkStateSAB = data[5];
  const chunkX = data[6];
  const chunkY = data[7];
  const chunkZ = data[8];
  WorldMatrix.__setChunk(
   chunkX,
   chunkY,
   chunkZ,
   voxelsSAB,
   voxelStatesSAB,
   heightMapSAB,
   minMaxMapSAB,
   chunkStateSAB
  );
 },

 _releaseChunk(data: any[]) {
  const chunkX = data[1];
  const chunkY = data[2];
  const chunkZ = data[3];
  WorldMatrix.__removeChunk(chunkX, chunkY, chunkZ);
 },

 _syncGlobalVoxelPalette(data: any[]) {

  WorldMatrix.__setGlobalVoxelPalette(data[1], data[2],data[3]);
 },

 _setThreadName(data: any[]) {
  this.threadName = data[1];
  WorldMatrix.threadName = this.threadName;
 },
};
