import type { DivineVoxelEngineFX } from "FX/DivineStarVoxelEngineFX";
import { ThreadComm } from "threadcomm"
export async function InitWorker(
 DVEFX: DivineVoxelEngineFX
) {
 await ThreadComm.$INIT("fx");
 await DVEFX.UTIL.createPromiseCheck({
  check: () => {
   return DVEFX.isReady();
  },
  checkInterval: 1,
 });
}
