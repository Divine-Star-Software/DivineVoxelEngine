import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitNexusWorker(DVEN, initData) {
    await ThreadComm.$INIT("nexus");
    await DVEN.UTIL.createPromiseCheck({ check: DVEN.isReady, checkInterval: 1 });
}
