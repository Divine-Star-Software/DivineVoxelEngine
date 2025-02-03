import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor";
import { Threads } from "@amodx/threads";
import { Environment } from "../Util/Environment";
import { WorldRegister } from "../World/WorldRegister";
import InitUpdateTasks from "../Tasks/Update/InitTasks";
import InitPropagationTasks from "../Tasks/Propagation/InitTasks";
import InitMesherTasks from "../Mesher/InitTask";
import InitWorldGenerationTasks from "../Tasks/WorldGeneration/InitTasks";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitMesher from "../Mesher/InitMesher";
import InitArchiveTasks from "../World/Archive/InitTasks";
export async function StartContrusctor(data: {} = {}) {
  const DVEC = new DivineVoxelEngineConstructor();

  DivineVoxelEngineConstructor.environment = Environment.isNode()
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineConstructor.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", self, parent);

  let ready = false;

  InitDataSync({
    onSync(data) {
      InitMesher(data.voxels.materials.palette, data.voxels.models);
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

  InitArchiveTasks({ worldThread: DVEC.threads.world });
  InitWorldDataSync();
  InitPropagationTasks();
  InitMesherTasks(DVEC.threads.parent);
  InitUpdateTasks({
    onDone(tasks, origin) {
      origin.runTask("build-queue", [
        tasks.origin[0],
        tasks.bounds.getSections(),
      ]);
    },
  });
  InitWorldGenerationTasks();
  return DVEC;
}
