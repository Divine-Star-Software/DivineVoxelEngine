import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck";
import type { DivineVoxelEngineRichWorld } from "./DivineVoxelEngineRichWorld";
import { Threads } from "@amodx/threads/";

export default async function (DVERW: DivineVoxelEngineRichWorld) {
  let parent = "render";
  if (DVERW.environment == "node") {
    parent = "server";
  }
  await Threads.init("rich-world", parent);
  await CreatePromiseCheck({
    check: () => {
      return DVERW.threads.state.isReady();
    },
    checkInterval: 1,
  });
}
