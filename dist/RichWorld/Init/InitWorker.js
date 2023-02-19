import { ThreadComm } from "threadcomm";
export async function InitWorker(DVERW) {
    ThreadComm.$INIT("rich-world");
    await DVERW.UTIL.createPromiseCheck({
        check: () => {
            return DVERW.isReady();
        },
        checkInterval: 1,
    });
}
