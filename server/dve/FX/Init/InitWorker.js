import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(DVEFX) {
    await ThreadComm.$INIT("fx");
    await DVEFX.UTIL.createPromiseCheck({
        check: () => {
            return DVEFX.isReady();
        },
        checkInterval: 1,
    });
}
