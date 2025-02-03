import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineNexus } from "../Contexts/Nexus/DivineVoxelEngineNexus";
import { Environment } from "../Util/Environment";
import { Threads } from "@amodx/threads";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import { SchemaRegister } from "../Voxels/State/SchemaRegister";
import { VoxelTagStates } from "../Voxels/Data/VoxelTagStates";
export async function StartNexus(data: {} = {}) {
  const DVEN = new DivineVoxelEngineNexus(data || {});
  DivineVoxelEngineNexus.environment = Environment.isNode()
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineNexus.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", self, parent);

  let ready = false;
  InitDataSync({
    onSync(data) {
      ready = true;
    },
  });
  InitWorldDataSync();
  await new Promise((resolve) => {
    const readyCheck = () => {
      if (ready) return resolve(true);
      setTimeout(readyCheck, 10);
    };
    readyCheck();
  });

  return DVEN;
}
