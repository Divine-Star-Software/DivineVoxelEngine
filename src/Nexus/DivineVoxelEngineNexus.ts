//types
import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import type { EngineSettingsData } from "Meta/index.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//comms
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//objects
import { Util } from "../Global/Util.helper.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { NexusEntites } from "./NexusEntities/NexusEntites.manager.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";

export const DVEN = {
 environment: <"node" | "browser">"browser",
 __connectedToWorld: false,

 UTIL: Util,
 settings: EngineSettings,

 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,

 worldComm: WorldComm,
 renderComm: RenderComm,

 nexusEntites: NexusEntites,

 voxelManager: VoxelManager,

 worldBounds: Util.getWorldBounds(),

 async $INIT(data: DVENInitData) {
  this.settings.setContext("DVEN");
  WorldMatrix.setVoxelManager(this.voxelManager);
  await InitNexusWorker(this, data);
 },

 isReady() {
  return DVEN.matrixHub.worldPort !== undefined && DVEN.__connectedToWorld;
 },

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
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

DVEN.environment = Util.getEnviorment();
