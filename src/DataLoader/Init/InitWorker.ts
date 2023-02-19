import type { DivineVoxelEngineData } from "DataLoader/DivineVoxelEngineDataLoader";
import { ThreadComm } from "threadcomm"
export async function InitWorker(DVED: DivineVoxelEngineData) {
 ThreadComm.$INIT("data-loader");
 await DVED.UTIL.createPromiseCheck({
  check: () => {
   return DVED.isReady();
  },
  checkInterval: 1,
 });
}
