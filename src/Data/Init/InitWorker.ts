import type { DivineVoxelEngineData } from "Data/DivineVoxelEngineData";
import type { DVEDInitData } from "Meta/Data/DVED";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(
 DVED: DivineVoxelEngineData,
 initData: DVEDInitData
) {
 ThreadComm.$INIT("data");
 await DVED.UTIL.createPromiseCheck({
  check: () => {
   return DVED.isReady();
  },
  checkInterval: 1,
 });
}
