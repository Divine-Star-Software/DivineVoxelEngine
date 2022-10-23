import type { DivineVoxelEngineRichWorld } from "RichWorld/DivineStarVoxelEngineRichWorld";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export async function InitWorker(DVERW: DivineVoxelEngineRichWorld) {
 ThreadComm.$INIT("rich-world");
 await DVERW.UTIL.createPromiseCheck({
  check: () => {
   return DVERW.isReady();
  },
  checkInterval: 1,
 });
}
