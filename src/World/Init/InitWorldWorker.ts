import type { DivineVoxelEngineWorld } from "../DivineVoxelEngineWorld.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { RegisterDataHooks } from "../Hooks/Data/DataHooks.js";
import { DataSync } from "../Data/DataSync.js";

export async function InitWorldWorker(
 DVEW: DivineVoxelEngineWorld
): Promise<any> {
 await ThreadComm.$INIT("world");
 
 RegisterDataHooks();
 DataSync.registerComm(DVEW.ccm);
 await DVEW.UTIL.createPromiseCheck({
  check: () => {
   return DVEW.isReady();
  },
  checkInterval: 1,
  onReady: () => {
   DVEW.cQueues.$INIT();
  },
 });

 await DVEW.dataSync.$INIT();
}
