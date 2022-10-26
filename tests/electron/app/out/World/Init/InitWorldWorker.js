import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { RegisterDataHooks } from "../Hooks/Data/DataHooks.js";
import { DataSync } from "../Data/DataSync.js";
export async function InitWorldWorker(DVEW) {
    await ThreadComm.$INIT("world");
    RegisterDataHooks();
    DataSync.registerComm(DVEW.ccm);
    await DVEW.UTIL.createPromiseCheck({
        check: () => {
            return DVEW.isReady();
        },
        checkInterval: 1,
        onReady: () => {
            DVEW.cQueues.$INIT();
            DVEW.dataSync.$INIT();
        },
    });
}
