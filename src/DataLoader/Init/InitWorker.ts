import type { DivineVoxelEngineData } from "DataLoader/DivineVoxelEngineDataLoader";
import type { DVEDInitData } from "Meta/DataLoader/DVED";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(
 DVED: DivineVoxelEngineData,
 initData: DVEDInitData
) {
 ThreadComm.$INIT("data-loader");
 await DVED.UTIL.createPromiseCheck({
  check: () => {
   return DVED.isReady();
  },
  checkInterval: 1,
 });
}
