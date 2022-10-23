import type { DivineVoxelEngineWorld } from "../DivineVoxelEngineWorld.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export async function InitWorldWorker(
 DVEW: DivineVoxelEngineWorld
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
  },
 });
}
