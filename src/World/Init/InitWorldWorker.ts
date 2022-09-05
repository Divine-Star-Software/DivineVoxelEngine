import type { DVEWInitData } from "Meta/World/DVEW.js";
import type { DivineVoxelEngineWorld } from "../DivineVoxelEngineWorld.js";

export async function InitWorldWorker(
 DVEW: DivineVoxelEngineWorld,
 initData: DVEWInitData
): Promise<any> {
 if (initData.onReady) {
  DVEW.renderComm.onReady = initData.onReady;
 }
 if (initData.onMessage) {
  DVEW.renderComm.onMessage = initData.onMessage;
 }
 if (initData.onRestart) {
  DVEW.renderComm.onRestart = initData.onRestart;
 }

 const parentPort = await DVEW.UTIL.getWorkerPort(DVEW.environment);
 if (DVEW.environment == "browser") {
  DVEW.renderComm.setPort(parentPort);
 }
 if (DVEW.environment == "node") {
  DVEW.serverComm.setPort(parentPort);
 }
 await DVEW.UTIL.createPromiseCheck({
  check: () => {
   return DVEW.isReady();
  },
  checkInterval: 1,
  onReady: () => {
   DVEW.voxelMatrix.$INIT();
   DVEW.queues.$INIT();
   const nexusSettings = DVEW.settings.settings.nexus;
   if (nexusSettings.enabled && nexusSettings.autoSyncVoxelPalette) {
    DVEW.matrixCentralHub.syncVoxelPaletteInThread("nexus");
   }
   const fxSettigns = DVEW.settings.settings.fx;
   if (fxSettigns.enabled && fxSettigns.autoSyncVoxelPalette) {
    DVEW.matrixCentralHub.syncVoxelPaletteInThread("fx");
   }
   DVEW.matrixCentralHub.syncVoxelData();
   DVEW.matrixMap.flush();
   if (initData.onReady) {
    initData.onReady();
   }
  },
 });
}
