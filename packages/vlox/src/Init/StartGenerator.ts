import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { Threads } from "@amodx/threads";
import { Environment } from "../Util/Environment";
import { WorldRegister } from "../World/WorldRegister";
import InitUpdateTasks from "../Tasks/Paint/InitTasks";
import InitPropagationTasks from "../Tasks/Propagation/InitTasks";
import InitWorldGenerationTasks from "../Tasks/WorldGeneration/InitTasks";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitArchiveTasks from "../World/Archive/InitTasks";
import { DivineVoxelEngineGenerator } from "../Contexts/Generator";
export async function StartGenerator(data: {} = {}) {
  WorldRegister.proxy = true;
  const DVEG = new DivineVoxelEngineGenerator();

  DivineVoxelEngineGenerator.environment = Environment.isNode()
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineGenerator.environment == "node") {
    parent = "server";
  }

  await Threads.init("generator", self, parent);

  let ready = false;

  InitDataSync({
    onSync(data) {
      ready = true;
    },
  });

  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });

  await new Promise((resolve) => {
    const readyCheck = () => {
      if (ready) return resolve(true);
      setTimeout(readyCheck, 10);
    };
    readyCheck();
  });

  InitArchiveTasks({ worldThread: DVEG.threads.world });
  InitWorldDataSync(DVEG.threads.world);
  InitPropagationTasks();
  InitUpdateTasks();
  InitWorldGenerationTasks({ worldThread: DVEG.threads.world });
  return DVEG;
}
