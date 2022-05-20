import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";
import type { DVENInitData } from "Meta/Nexus/DVEN";
export async function InitNexusWorker(
 DVEN: DivineVoxelEngineNexus,
 initData: DVENInitData
) {
 const renderPort = await DVEN.UTIL.getWorkerPort(DVEN.environment);
 DVEN.renderComm.setPort(renderPort);
 await DVEN.UTIL.createPromiseCheck({ check: DVEN.isReady, checkInterval: 1 });
}
