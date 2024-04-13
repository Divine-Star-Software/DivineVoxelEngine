import type { DivineVoxelEngineDataLoader } from "./DivineVoxelEngineDataLoader";
import { ThreadComm } from "@divinestar/threads/";
import { CreatePromiseCheck } from "@divinestar/utils/Intervals/CreatePromiseCheck";
export default async function (DVED: DivineVoxelEngineDataLoader) {
  let parent = "render";
  if (DVED.environment == "node") {
    parent = "server";
  }
  await ThreadComm.$INIT("data-loader", parent);

  await CreatePromiseCheck({
    check: () => {
      return DVED.threads.state.isReady();
    },
    checkInterval: 1,
  });
}
