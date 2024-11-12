import type { DivineVoxelEngineNexus } from "./DivineVoxelEngineNexus";
import { Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";
export default async function (DVEN: DivineVoxelEngineNexus) {
  let parent = "render";
  if (DVEN.environment == "node") {
    parent = "server";
  }
  await Threads.init("nexus", parent);
  await CreatePromiseCheck({
    check: () => {
      return DVEN.threads.state.isReady();
    },
    checkInterval: 1,
  });
}
