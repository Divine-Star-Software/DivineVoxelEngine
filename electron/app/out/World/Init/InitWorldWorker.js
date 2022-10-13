import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorldWorker(DVEW, initData) {
    await ThreadComm.$INIT("world");
    await DVEW.UTIL.createPromiseCheck({
        check: () => {
            return DVEW.isReady();
        },
        checkInterval: 1,
        onReady: () => {
            DVEW.voxelMatrix.$INIT();
            DVEW.queues.$INIT();
            DVEW.queues.$CreateQueues();
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
