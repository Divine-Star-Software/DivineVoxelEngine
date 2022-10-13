import { WorldTasks } from "../../Constants/InterComms/WorldTasks.js";
import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import type { DVECInitData } from "Meta/Constructor/DVEC";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export async function InitWorker(
 DVEC: DivineVoxelEngineConstructor,
 initData: DVECInitData
) {
 DVEC.settings.setContext("DVEC");
 await ThreadComm.$INIT("constructor");

 DVEC.DVEB.$INIT();
 DVEC.DVEP.$INIT();
 await DVEC.UTIL.createPromiseCheck({
  check: () => {
   return DVEC.isReady();
  },
  onReady() {
   if (DVEC.environment == "browser") {
    if (DVEC.worldMatrix.threadName == "constructor-1") {
     DVEC.worldComm.sendMessage(WorldTasks.syncShapeMap, [
      DVEC.DVEB.shapeManager.shapeMap,
     ]);
    }
   }
  },
  checkInterval: 1,
 });
}
