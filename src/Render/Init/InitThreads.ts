import type { DivineVoxelEngineRender } from "../DivineVoxelEngineRender.js";
import type { DVERInitData } from "Meta/Render/DVER";
import { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { CommBase } from "threadcomm";


export async function InitWorkers(
 DVER: DivineVoxelEngineRender,
 initData: DVERInitData
) {
 DVER.settings.syncSettings(<any>initData);


 await DVER.TC.$INIT("render", "global");



 if (!(initData.worldWorker instanceof Worker)) {
  throw Error(
   "Supplied data for World Worker is not correct. Must be path to worker or a worker."
  );
 }
 DVER.worldComm.setPort(initData.worldWorker);

 if (
  Array.isArray(initData.constructorWorker) &&
  initData.constructorWorker[0] instanceof Worker
 ) {
  DVER.constructorCommManager.setConstructors(initData.constructorWorker);
 } else {
  throw Error(
   "Supplied data for the Constructor Workers is not correct. Must be path to worker or an array workers."
  );
 }

 if (initData.nexusWorker && initData.nexus?.enabled) {
  if (!(initData.nexusWorker instanceof Worker)) {
   throw Error(
    "Supplied data for Nexus Worker is not correct. Must be path to worker or a worker."
   );
  }
  DVER.nexusComm.setPort(initData.nexusWorker);
 }

 if (initData.dataWorker && initData.data?.enabled) {
  if (!(initData.dataWorker instanceof Worker)) {
   throw Error(
    "Supplied data for Data Worker is not correct. Must be path to worker or a worker."
   );
  }
  DVER.dataComm.setPort(initData.dataWorker);
 }

 if (initData.fxWorker && initData.fx?.enabled) {
  if (!(initData.fxWorker instanceof Worker)) {
   throw Error(
    "Supplied data for FX Worker is not correct. Must be path to worker or a worker."
   );
  }
  DVER.fxComm.setPort(initData.fxWorker);
 }

 if (initData.richWorldWorker && initData.richWorld?.enabled) {
  if (!(initData.richWorldWorker instanceof Worker)) {
   throw Error(
    "Supplied data for Rich World Worker is not correct. Must be path to worker or a worker."
   );
  }
  DVER.richWorldComm.setPort(initData.richWorldWorker);
 }

 const coms: CommBase[] = [];
 if (DVER.nexusComm.isPortSet()) {
  coms.push(DVER.nexusComm);
 }
 if (DVER.dataComm.isPortSet()) {
  coms.push(DVER.dataComm);
 }
 if (DVER.fxComm.isPortSet()) {
  coms.push(DVER.fxComm);
 }
 if (DVER.richWorldComm.isPortSet()) {
  coms.push(DVER.richWorldComm);
 }

 for (const com of DVER.constructorCommManager.__comms) {
  await com.waitTillTasksExist("sync-settings");
  com.runTasks<EngineSettingsData>(
   "sync-settings",
   EngineSettings.getSettingsCopy()
  );
 }

 if (DVER.worldComm.isPortSet()) {
  await DVER.worldComm.waitTillTasksExist("sync-settings");
  DVER.constructorCommManager.$INIT();
  DVER.worldComm.runTasks<EngineSettingsData>(
   "sync-settings",
   EngineSettings.getSettingsCopy()
  );
  for (const com of coms) {
   (com as any).$INIT();
  }
 }

 for (const com of coms) {
  if (com.isPortSet()) {
   await com.waitTillTasksExist("sync-settings");
   com.runTasks<EngineSettingsData>(
    "sync-settings",
    EngineSettings.getSettingsCopy()
   );
  }
 }

 const proms: Promise<any>[] = [];
 for (const com of DVER.constructorCommManager.__comms) {
  proms.push(com.waitTillTasksExist("ready"));
 }
 await Promise.all(proms);
 await DVER.worldComm.waitTillTasksExist("sync-all-data");
 DVER.worldComm.runTasks("sync-all-data", true);

 window.addEventListener("beforeunload", () => {
  DVER.constructorCommManager.destroyAll();
  DVER.worldComm.destroy();
  DVER.nexusComm.destroy();
  DVER.fxComm.destroy();
  DVER.dataComm.destroy();
 });
}
