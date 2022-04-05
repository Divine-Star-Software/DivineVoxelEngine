//types
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import type { DVENInitData } from "Meta/Nexus/DVEN.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { EngineSettingsData } from "Meta/index.js";
import { NexusEntites } from "./NexusEntities/NexusEntites.manager.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";

class DivineVoxelEngineNexusClass {
 engineSettings = new EngineSettings();
 worldMatrix = new WorldMatrix();
 matrixHub = new MatrixHub("nexus", this.worldMatrix);

 worldComm = new WorldComm(this);
 renderComm = new RenderComm();

 nexusEntites = new NexusEntites(this);

 async $INIT(data: DVENInitData) {
  await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
 }

 syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  if (data.chunks) {
   this.worldMatrix.chunkBounds.setChunkBounds(
    data.chunks.chunkXPow2,
    data.chunks.chunkYPow2,
    data.chunks.chunkZPow2
   );
   this.worldMatrix.syncChunkBounds();
  }
 }

 /**# Load chunk into Nexus
  * Load a chunk into the shared nexus thread.
  */
 async loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number) {
  this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
  return await this.worldMatrix.awaitChunkLoad(chunkX, chunkY, chunkZ);
 }

 /**# Release Chunk From Nexus
  * Remve a chunk in the shared nexus thread.
  */
 releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number) {
  this.matrixHub.requestChunkRelease(chunkX, chunkY, chunkZ);
 }

}

export type DivineVoxelEngineNexus = DivineVoxelEngineNexusClass;
export const DVEN = new DivineVoxelEngineNexusClass();
