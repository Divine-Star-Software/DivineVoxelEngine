import type { DivineVoxelEngineNexus } from "./DivineVoxelEngineNexus";
import { ThreadComm } from "@divinestar/threads/";
import { CreatePromiseCheck } from "@divinestar/utils/Intervals/CreatePromiseCheck.js";
export default async function (DVEN: DivineVoxelEngineNexus) {
  let parent = "render";
  if (DVEN.environment == "node") {
    parent = "server";
  }
  await ThreadComm.$INIT("nexus", parent);
  await CreatePromiseCheck({
    check: () => {
      return DVEN.threads.state.isReady();
    },
    checkInterval: 1,
  });
}
