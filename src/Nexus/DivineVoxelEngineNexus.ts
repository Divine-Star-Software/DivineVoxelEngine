//types
import type { DVENInitData } from "Meta/Nexus/DVEN.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//functions
import { InitNexusWorker } from "./Functions/InitNexusWorker.js";
import { WorldComm } from "./World/WorldComm.js";

class DivineVoxelEngineNexusClass {
 worldMatrix = new WorldMatrix();
 matrixHub = new MatrixHub("nexus", this.worldMatrix);

 worldComm = new WorldComm();

 async $INIT(data: DVENInitData) {
  await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
 }

 /**# Load chunk into Nexus
  * Load a chunk into the shared nexus thread.
  */
 loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number) {}

 /**# Release Chunk From Nexus
  * Remve a chunk in the shared nexus thread.
  */
 releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number) {}
}

export type DivineVoxelEngineNexus = DivineVoxelEngineNexusClass;
export const DVEN = new DivineVoxelEngineNexusClass();
