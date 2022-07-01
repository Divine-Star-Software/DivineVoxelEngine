import type { DivineVoxelEngineData } from "Data/DivineStarVoxelEngineData";
import type { DVEDInitData } from "Meta/Data/DVED";

export async function InitWorker(
 DVED: DivineVoxelEngineData,
 initData: DVEDInitData
) {
 DVED.renderComm.onReady = initData.onReady;
 if (initData.onMessage) {
  DVED.renderComm.onMessage = initData.onMessage;
 }
 if (initData.onRestart) {
  DVED.renderComm.onRestart = initData.onRestart;
 }

 const renderPort = await DVED.UTIL.getWorkerPort(DVED.environment);
 DVED.renderComm.setPort(renderPort);


 await DVED.UTIL.createPromiseCheck({
  check: () => {
   return DVED.isReady();
  },
  checkInterval: 1,
 });
}
