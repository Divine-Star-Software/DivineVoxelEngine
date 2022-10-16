import type { DVEWInitData } from "Meta/World/DVEW.js";
import type { DivineVoxelEngineWorld } from "../DivineVoxelEngineWorld.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export async function InitWorldWorker(
 DVEW: DivineVoxelEngineWorld,
 initData: DVEWInitData
): Promise<any> {
 await ThreadComm.$INIT("world");
 await DVEW.UTIL.createPromiseCheck({
  check: () => {
   return DVEW.isReady();
  },
  checkInterval: 1,
  onReady: () => {
   DVEW.queues.$INIT();
   DVEW.dataSync.$INIT();
   if (initData.onReady) {
    initData.onReady();
   }
  },
 });
}
