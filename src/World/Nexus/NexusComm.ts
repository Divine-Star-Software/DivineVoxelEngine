import type { DivineVoxelEngineWorld } from "index";

/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
 port: MessagePort;

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 setNexusPort(port: MessagePort) {
  this.port = port;

  this.DVEW.matrixCentralHub.registerThread("nexus", port);
  port.onmessage = (event: MessageEvent) => {
   //stuff
  // console.log(event);
  };
 }

 nexusLoadChunk(chunkX: number, chunkY: number, chunkZ: number) {
  if (this.DVEW.matrix.isChunkInMatrix(chunkX, chunkY, chunkZ)) return false;
  this.DVEW.matrixCentralHub.syncChunkInThread("nexus", chunkX, chunkY, chunkZ);
 }
 removeChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number) {
  if (!this.DVEW.matrix.isChunkInMatrix(chunkX, chunkY, chunkZ)) return false;
  this.DVEW.matrixCentralHub.releaseChunkInThread(
   "nexus",
   chunkX,
   chunkY,
   chunkZ
  );
 }
}
