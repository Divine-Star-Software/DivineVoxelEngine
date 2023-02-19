import { ThreadComm } from "threadcomm";
export async function InitWorker(DVEC) {
    await ThreadComm.$INIT("constructor");
    DVEC.builder.$INIT();
    DVEC.tasksQueue.$INIT();
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        onReady() { },
        checkInterval: 1,
    });
}
