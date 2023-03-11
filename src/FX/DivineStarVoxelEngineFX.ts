//types
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm, ParentComm } from "./Threads/FXThreads.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";

export const DVEFX = {
 environment: <"node" | "browser">"browser",

 UTIL: Util,
 settings: EngineSettings,

 dataSyncNode: DataSyncNode,
 data: DataManager,

 worldComm: WorldComm,
 parentComm: ParentComm,


 async $INIT() {
  await InitWorker(this);
 },
};

export type DivineVoxelEngineFX = typeof DVEFX;
