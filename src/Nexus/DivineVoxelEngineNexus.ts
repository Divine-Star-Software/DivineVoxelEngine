//types
import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import type { EngineSettingsData } from "Meta/index.js";
//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//comms
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//objects
import { Util } from "../Global/Util.helper.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { NexusEntites } from "./NexusEntities/NexusEntites.manager.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";

export const DVEN = {
 environment: <"node" | "browser">"browser",


 UTIL: Util,
 chunkReader: Util.getChunkReader(),
 settings: EngineSettings,

 dataSyncNode : DataSyncNode,
 data : DataManager,

 worldMatrix: WorldMatrix,


 worldComm: WorldComm,
 parentComm: ParentComm,

 nexusEntites: NexusEntites,

 voxelManager: VoxelManager,

 worldBounds: WorldBounds,

 async $INIT(data: DVENInitData) {
  this.settings.setContext("DVEN");
  WorldMatrix.setVoxelManager(this.voxelManager);

  await InitNexusWorker(this, data);
 },

 isReady() {
  return DVEN.worldComm.isPortSet();
 },

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.chunkReader.syncSettings();
 },


};
export type DivineVoxelEngineNexus = typeof DVEN;

DVEN.environment = Util.getEnviorment();
