import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";
import type { DVENInitData } from "Meta/Nexus/DVEN";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitNexusWorker(
 DVEN: DivineVoxelEngineNexus,
 initData: DVENInitData
) {
 await ThreadComm.$INIT("nexus");
 await DVEN.UTIL.createPromiseCheck({ check: DVEN.isReady, checkInterval: 1 });
}
