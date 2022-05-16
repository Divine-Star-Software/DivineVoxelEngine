//types
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

export const DVEN = {
 environment: <"node" | "browser">"browser",
 engineSettings: EngineSettings,
 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,
 __connectedToWorld: false,

 worldComm: WorldComm,
 renderComm: RenderComm,

 nexusEntites: NexusEntites,

 async $INIT(data: DVENInitData) {
  await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
 },

 isReady() {
  return this.matrixHub.worldPort !== undefined && this.__connectedToWorld;
 },

 syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  if (data.chunks) {
   this.worldMatrix.worldBounds.setChunkBounds(
    data.chunks.chunkXPow2,
    data.chunks.chunkYPow2,
    data.chunks.chunkZPow2
   );
   this.worldMatrix.syncChunkBounds();
  }
  if (data.regions) {
   this.worldMatrix.worldBounds.setRegionBounds(
    data.regions.regionXPow2,
    data.regions.regionYPow2,
    data.regions.regionZPow2
   );
  }
 },

 /**# Load chunk into Nexus
  * Load a chunk into the shared nexus thread.
  */
 async loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number) {
  this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
  return await this.worldMatrix.awaitChunkLoad(chunkX, chunkY, chunkZ);
 },

 /**# Release Chunk From Nexus
  * Remve a chunk in the shared nexus thread.
  */
 releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number) {
  this.matrixHub.requestChunkRelease(chunkX, chunkY, chunkZ);
 },
};
export type DivineVoxelEngineNexus = typeof DVEN;

DVEN.matrixHub.setThreadName("nexus");
