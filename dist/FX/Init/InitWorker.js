import { FXThreadState } from "../Threads/FXThreadState.js";
import { ThreadComm } from "threadcomm";
export async function InitWorker(DVEFX) {
    let parent = "render";
    if (DVEFX.environment == "node") {
        parent = "server";
    }
    await ThreadComm.$INIT("fx", parent);
    await DVEFX.UTIL.createPromiseCheck({
        check: () => {
            return FXThreadState.isReady();
        },
        checkInterval: 1,
    });
}
