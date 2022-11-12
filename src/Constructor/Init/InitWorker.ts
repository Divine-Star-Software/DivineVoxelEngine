import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export async function InitWorker(DVEC: DivineVoxelEngineConstructor) {
 await ThreadComm.$INIT("constructor");

 DVEC.builder.$INIT();
 DVEC.propagation.$INIT();
 await DVEC.UTIL.createPromiseCheck({
  check: () => {
   return DVEC.isReady();
  },
  onReady() {
   if (DVEC.environment == "browser") {
    if (DVEC.TC.threadNumber == 1) {
     DVEC.worldComm.syncData("shape-map", DVEC.builder.shapeManager.shapeMap);
    }
   }
  },
  checkInterval: 1,
 });
}
