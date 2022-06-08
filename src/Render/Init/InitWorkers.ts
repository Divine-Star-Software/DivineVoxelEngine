import type { DivineVoxelEngineRender } from "../DivineVoxelEngineRender.js";
import type { DVERInitData } from "Meta/Render/DVER";

export function InitWorkers(
 DVER: DivineVoxelEngineRender,
 initData: DVERInitData
) {
 DVER.settings.syncSettings(initData);
 DVER._handleOptions();

 if (typeof initData.worldWorker == "string") {
  const worker = DVER.__createWorker(initData.worldWorker);
  DVER.worldComm.setPort(worker);
 } else if (initData.worldWorker instanceof Worker) {
  DVER.worldComm.setPort(initData.worldWorker);
 } else {
  throw Error(
   "Supplied data for World Worker is not correct. Must be path to worker or a worker."
  );
 }


 if (typeof initData.constructorWorker == "string") {
  DVER.constructorCommManager.createConstructors(initData.constructorWorker);
 } else if (
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
  if (typeof initData.nexusWorker == "string") {
   const worker = DVER.__createWorker(initData.nexusWorker);
   DVER.nexusComm.setPort(worker);
  } else if (initData.nexusWorker instanceof Worker) {
   DVER.nexusComm.setPort(initData.nexusWorker);
  } else {
   throw Error(
    "Supplied data for Nexus Worker is not correct. Must be path to worker or a worker."
   );
  }
  DVER.nexusComm.$INIT();
 }

 DVER._syncSettings(initData);

 DVER.textureManager.generateTexturesData();
 //DVER.builderCommManager.$INIT();
// DVER.propagationCommManager.$INIT();
 DVER.constructorCommManager.$INIT();

 //terminate all workers
 window.addEventListener("beforeunload", () => {
  for (const constructor of DVER.constructorCommManager.constructors) {
   //@ts-ignore
   constructor.port.terminate();
  }
  //@ts-ignore
  DVER.worldComm.port.terminate();
  if (DVER.nexusComm.port) {
   //@ts-ignore
   DVER.nexusComm.port.terminate();
  }
 });
}
