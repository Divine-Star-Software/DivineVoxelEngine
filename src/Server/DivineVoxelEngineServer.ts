import type { DVESInitData } from "Meta/Server/DVES";

//inter comms
import { ConstructorCommManager } from "./Threads/Constructor/ConstructorCommManager.js";
import { WorldComm } from "./Threads/World/WorldComm.js";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
//functions
import { InitWorkers } from "./Init/InitWorkers.js";
import { EngineSettingsData } from "Meta/index.js";
import { Util } from "../Global/Util.helper.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";

export const DVES = {
 settings: EngineSettings,
 worldComm: WorldComm,
 constructorCommManager: ConstructorCommManager,

 worldBounds: WorldBounds,
 UTIL: Util,

 async $INIT(data: DVESInitData) {
  InitWorkers(this, data);
 },

 __createWorker(path: string) {
  return new Worker(new URL(path, import.meta.url), {
   type: "module",
  });
 },

 syncSettingsWithWorkers(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  const copy = this.settings.getSettingsCopy();

  this.worldComm.sendMessage("sync-settings", [copy]);
  this.constructorCommManager.syncSettings(copy);
  /*   if (this.nexusComm.port) {
   this.nexusComm.sendMessage("sync-settings", [copy]);
  }
  if (this.dataComm.port) {
   this.dataComm.sendMessage("sync-settings", [copy]);
  }
  if (this.fxComm.port) {
   this.fxComm.sendMessage("sync-settings", [copy]);
  }
  if (this.richWorldComm.port) {
   this.richWorldComm.sendMessage("sync-settings", [copy]);
  } */
  this.constructorCommManager.syncSettings(copy);
 },
};

export type DivineVoxelEngineServer = typeof DVES;
