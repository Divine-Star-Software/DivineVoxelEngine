import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { Threads } from "@amodx/threads";
import { Environment } from "../Util/Environment";
import { WorldRegister } from "../World/WorldRegister";
import InitLogicTasks from "../Tasks/Logic/InitTasks";
import InitUpdateTasks from "../Tasks/Update/InitTasks";
import InitPropagationTasks from "../Tasks/Propagation/InitTasks";
import InitWorldGenerationTasks from "../Tasks/WorldGeneration/InitTasks";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitArchiveTasks from "../World/Archive/InitTasks";
import { DivineVoxelEngineGenerator } from "../Contexts/Generator";
export async function StartGenerator(data: {} = {}) {
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
  InitWorldDataSync();
  InitPropagationTasks();
  InitLogicTasks();
  InitUpdateTasks({
    onDone(tasks, origin) {

      /* 
      origin.runTask("build-queue", [
        tasks.origin[0],
        tasks.bounds.getSections(),
      ]); */
    },
  });
  InitWorldGenerationTasks({ worldThread: DVEG.threads.world });
  return DVEG;
}
