import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineNexus } from "../Contexts/Nexus/DivineVoxelEngineNexus";
import { Environment } from "../Util/Environment";
import { Threads } from "@amodx/threads";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import { WorldRegister } from "../World/WorldRegister";

export async function StartNexus(data: {} = {}) {
  WorldRegister.proxy = true;
  const DVEN = new DivineVoxelEngineNexus(data || {});
  DivineVoxelEngineNexus.environment = Environment.isNode()
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineNexus.environment == "node") {
    parent = "server";
  }

  await Threads.init("generator", self, parent);

  let ready = false;
  InitDataSync({
    onSync(data) {
      ready = true;
    },
  });
  InitWorldDataSync(DVEN.threads.world);
  await new Promise((resolve) => {
    const readyCheck = () => {
      if (ready) return resolve(true);
      setTimeout(readyCheck, 10);
    };
    readyCheck();
  });

  return DVEN;
}
