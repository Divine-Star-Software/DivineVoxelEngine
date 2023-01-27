import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(DVERW) {
    ThreadComm.$INIT("rich-world");
    await DVERW.UTIL.createPromiseCheck({
        check: () => {
            return DVERW.isReady();
        },
        checkInterval: 1,
    });
}
