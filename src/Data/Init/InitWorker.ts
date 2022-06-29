import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import type { DVECInitData } from "Meta/Constructor/DVEC";

export async function InitWorker(
 DVEC: DivineVoxelEngineConstructor,
 initData: DVECInitData
) {
 DVEC.renderComm.onReady = initData.onReady;
 if (initData.onMessage) {
  DVEC.renderComm.onMessage = initData.onMessage;
 }
 if (initData.onRestart) {
  DVEC.renderComm.onRestart = initData.onRestart;
 }

 const renderPort = await DVEC.UTIL.getWorkerPort(DVEC.environment);
 DVEC.renderComm.setPort(renderPort);



 await DVEC.UTIL.createPromiseCheck({
  check: () => {
   return DVEC.isReady();
  },
  checkInterval: 1,
 });
}
