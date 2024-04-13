import { CreatePromiseCheck } from "@divinestar/utils/Intervals/CreatePromiseCheck";
import type { DivineVoxelEngineRichWorld } from "./DivineStarVoxelEngineRichWorld";
import { RichWorldThreadState } from "./Threads/RichWorldThreadState.js";
import { ThreadComm } from "@divinestar/threads/";

export default async function (DVERW: DivineVoxelEngineRichWorld) {
  let parent = "render";
  if (DVERW.environment == "node") {
    parent = "server";
  }
  await ThreadComm.$INIT("rich-world", parent);
  await CreatePromiseCheck({
    check: () => {
      return DVERW.threads.state.isReady();
    },
    checkInterval: 1,
  });
}
