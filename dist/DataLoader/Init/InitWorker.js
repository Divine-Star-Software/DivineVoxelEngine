import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(DVED) {
    ThreadComm.$INIT("data-loader");
    await DVED.UTIL.createPromiseCheck({
        check: () => {
            return DVED.isReady();
        },
        checkInterval: 1,
    });
}
