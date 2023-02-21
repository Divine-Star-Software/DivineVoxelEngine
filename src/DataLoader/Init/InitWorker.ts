import type { DivineVoxelEngineData } from "DataLoader/DivineVoxelEngineDataLoader";
import { ThreadComm } from "threadcomm";
export async function InitWorker(DVED: DivineVoxelEngineData) {
 let parent = "render";
 if (DVED.environment == "node") {
  parent = "server";
 }
 await ThreadComm.$INIT("data-loader", parent);

 await DVED.UTIL.createPromiseCheck({
  check: () => {
   return DVED.isReady();
  },
  checkInterval: 1,
 });
}
