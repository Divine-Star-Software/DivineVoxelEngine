import type { DivineVoxelEngineFX } from "FX/DivineStarVoxelEngineFX";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import type { DVEFXInitData } from "Meta/FX/DVEFX";

export async function InitWorker(
 DVEFX: DivineVoxelEngineFX,
 initData: DVEFXInitData
) {
 await ThreadComm.$INIT("fx");
 await DVEFX.UTIL.createPromiseCheck({
  check: () => {
   return DVEFX.isReady();
  },
  checkInterval: 1,
 });
}
