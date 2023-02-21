import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";
import { ThreadComm } from "threadcomm";
export async function InitNexusWorker(DVEN: DivineVoxelEngineNexus) {
 let parent = "render";
 if (DVEN.environment == "node") {
  parent = "server";
 }
 await ThreadComm.$INIT("nexus", parent);
 await DVEN.UTIL.createPromiseCheck({ check: DVEN.isReady, checkInterval: 1 });
}
