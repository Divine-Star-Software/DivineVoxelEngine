import { DataLoaderThreadState } from "../Threads/DataLoaderThreadState.js";
import { ThreadComm } from "threadcomm";
export async function InitWorker(DVED) {
    let parent = "render";
    if (DVED.environment == "node") {
        parent = "server";
    }
    await ThreadComm.$INIT("data-loader", parent);
    await DVED.UTIL.createPromiseCheck({
        check: () => {
            return DataLoaderThreadState.isReady();
        },
        checkInterval: 1,
    });
}
