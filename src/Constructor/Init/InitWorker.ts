import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import { ConstructorThreadState } from "../Threads/ConstructorThreadState.js";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { DataHooks } from "../../Data/DataHooks.js";

export async function InitWorker(DVEC: DivineVoxelEngineConstructor) {
 let parent = "render";
 if (DVEC.environment == "node") {
  parent = "server";
 }
 await ThreadComm.$INIT("constructor", parent);
 DVEC.builder.$INIT();

 ThreadComm.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
  EngineSettings.syncSettings(settings);
  ConstructorThreadState._settingsSynced = true;
  DataHooks.settingsSynced.run(settings);
 });
 

 await DVEC.UTIL.createPromiseCheck({
  check: () => {
   return ConstructorThreadState.isReady();
  },
  onReady() {},
  checkInterval: 1,
 });

 ThreadComm.registerTasks("ready", () => {});
}
