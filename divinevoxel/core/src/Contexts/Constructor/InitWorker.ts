import { DivineVoxelEngineConstructor } from "./DivineVoxelEngineConstructor.js";
import { Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";

export default async function (DVEC: DivineVoxelEngineConstructor) {
  let parent = "render";
  if (DivineVoxelEngineConstructor.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", parent);
  DVEC.TC.registerTasks("thread-ready", () => {});
  await DVEC.core.init();

  await CreatePromiseCheck({
    check: () => {
      return DVEC.core.threads.state.isReady();
    },
    onReady() {},
    checkInterval: 1,
  });


  DVEC.TC.registerTasks("ready", () => {});
}
