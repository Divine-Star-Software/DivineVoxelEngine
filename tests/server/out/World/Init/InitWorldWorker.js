import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { RegisterDataHooks } from "../Hooks/Data/DataHooks.js";
export async function InitWorldWorker(DVEW) {
    await ThreadComm.$INIT("world");
    RegisterDataHooks();
    await DVEW.UTIL.createPromiseCheck({
        check: () => {
            return DVEW.isReady();
        },
        checkInterval: 1,
    });
    DVEW.dataSync.$INIT();
    DVEW.cQueues.$INIT();
}
