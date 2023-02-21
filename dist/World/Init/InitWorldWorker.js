import { ThreadComm } from "threadcomm";
import { RegisterDataHooks } from "../Hooks/Data/DataHooks.js";
export async function InitWorldWorker(DVEW) {
    let parent = "render";
    if (DVEW.environment == "node") {
        parent = "server";
    }
    await ThreadComm.$INIT("world", parent);
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
