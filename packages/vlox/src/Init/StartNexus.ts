import InitDataSync from "../Contexts/Base/Remote/Sync/InitDataSync"
import { DivineVoxelEngineNexus } from "../Contexts/Nexus/DivineVoxelEngineNexus";
import { Environment } from "@amodx/core/Environment/Environment";
import { Threads } from "@amodx/threads";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck";
import InitWorldDataSync from "../Contexts/Base/Remote/Sync/InitWorldDataSync";

export async function StartNexus(data: {} = {}) {
  const DVEN = new DivineVoxelEngineNexus(data || {});
  DivineVoxelEngineNexus.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineNexus.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", parent);

  let ready = false;
  InitDataSync({
    onSync(data) {
      ready = true;
    },
  });
  InitWorldDataSync();
  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  return DVEN;
}
