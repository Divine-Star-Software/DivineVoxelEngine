import { NexusThreadState } from "../Threads/NexusThreadState.js";
import { ThreadComm } from "threadcomm";
export async function InitNexusWorker(DVEN) {
    let parent = "render";
    if (DVEN.environment == "node") {
        parent = "server";
    }
    await ThreadComm.$INIT("nexus", parent);
    await DVEN.UTIL.createPromiseCheck({ check: () => {
            return NexusThreadState.isReady();
        }, checkInterval: 1 });
}
