import type { WorldMatrix } from "./WorldMatrix";

/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export class MatrixHub {
 messageFunctions: Record<string, (data: any) => any | void> = {
  "sync-chunk": (data) => {
   this._syncChunk(data);
  },
  "release-chunk": (data) => {
   this._releaseChunk(data);
  },
  "sync-global-palettek": (data) => {
   this._releaseChunk(data);
  },
  "sync-region-palette": (data) => {
   this._releaseChunk(data);
  },
  "release-region-palette": (data) => {
   this._releaseChunk(data);
  },
  "set-world-port": (data) => {
    this._releaseChunk(data);
   },
 };


 worldPort : MessagePort;

 constructor(public threadName : string,private worldMatrix: WorldMatrix,) {}

 onMessage(data: any[], runAfter: (data: any) => any | void) {
  if(!data[0])return;
  const message = data[0];
  if (this.messageFunctions[message]) {
   this.messageFunctions[message](data);
   return;
  }
  runAfter(data);
 }

 requestChunkSync(chunkX: number, chunkY: number, chunkZ: number) {
     this.worldPort.postMessage(["matrix-sync-chunk"])
 }

 requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number) {}

 _setWorldPort(port : MessagePort) {
     this.worldPort = port;
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
