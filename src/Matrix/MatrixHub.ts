import type { WorldMatrix } from "./WorldMatrix";

/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export class MatrixHub {
 messageFunctions: Record<
  string,
  (data: any, event: MessageEvent) => any | void
 > = {
  "sync-chunk": (data, event) => {
    console.log(data);
   this._syncChunk(data);
  },
  "release-chunk": (data, event) => {
   this._releaseChunk(data);
  },
  "sync-global-palette": (data, event) => {
   this._releaseChunk(data);
  },
  "sync-region-palette": (data, event) => {
   this._releaseChunk(data);
  },
  "release-region-palette": (data, event) => {
   this._releaseChunk(data);
  },
  "set-world-port": (data, event) => {
   const port = event.ports[0];
   this._setWorldPort(port);
  },
 };

 worldPort: MessagePort;

 constructor(public threadName: string, private worldMatrix: WorldMatrix) {}

 onMessage(event: MessageEvent, runAfter: (event: MessageEvent) => any | void) {
  const data = event.data;
  console.log(data);
  if (!data || !data[0]) return;
  const message = data[0];
  if (this.messageFunctions[message]) {
   this.messageFunctions[message](data, event);
   return;
  }
  runAfter(event);
 }

 requestChunkSync(chunkX: number, chunkY: number, chunkZ: number) {
  this.worldPort.postMessage([
   "matrix-sync-chunk",
   this.threadName,
   chunkX,
   chunkY,
   chunkZ,
  ]);
 }

 requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number) {
  this.worldPort.postMessage([
   "matrix-release-chunk",
   this.threadName,
   chunkX,
   chunkY,
   chunkZ,
  ]);
 }

 _setWorldPort(port: MessagePort) {
  this.worldPort = port;
  this.worldPort.onmessage = (event)=>{
    console.log(event);
  }
 }

 _syncChunk(data: any[]) {
  const chunkSAB = data[1];
  const chunkStateSAB = data[2];
  const chunkX = data[3];
  const chunkY = data[4];
  const chunkZ = data[5];
  this.worldMatrix.__setChunk(chunkX, chunkY, chunkZ, chunkSAB, chunkStateSAB);
 }

 _releaseChunk(data: any[]) {
  const chunkX = data[1];
  const chunkY = data[2];
  const chunkZ = data[3];
  this.worldMatrix.__removeChunk(chunkX, chunkY, chunkZ);
 }

 _syncGlobalVoxelPalette(data: any[]) {
  this.worldMatrix.__setGlobalVoxelPalette(data[1]);
 }

 _syncRegionVoxelPalette(data: any[]) {
  const palette = data[1];
  const regionX = data[2];
  const regionY = data[3];
  const regionZ = data[4];
  this.worldMatrix.__setRegionVoxelPalette(regionX, regionY, regionZ, palette);
 }

 _releaseRegionVoxelPalette(data: any[]) {
  const regionX = data[1];
  const regionY = data[2];
  const regionZ = data[3];
  this.worldMatrix.__removeRegionVoxelPalette(regionX, regionY, regionZ);
 }
}
