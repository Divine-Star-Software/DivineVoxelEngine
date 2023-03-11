import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import { ConstructorThreadState } from "../Threads/ConstructorThreadState.js";
import { ThreadComm } from "threadcomm";

export async function InitWorker(DVEC: DivineVoxelEngineConstructor) {
 let parent = "render";
 if (DVEC.environment == "node") {
  parent = "server";
 }
 await ThreadComm.$INIT("constructor", parent);
 DVEC.builder.$INIT();
 DVEC.tasksQueue.$INIT();
 await DVEC.UTIL.createPromiseCheck({
  check: () => {
   return ConstructorThreadState.isReady()
  },
  onReady() {},
  checkInterval: 1,
 });
}
