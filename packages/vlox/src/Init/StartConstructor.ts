import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor";
import { Threads } from "@amodx/threads";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck";
import { VoxelGeometryLookUp } from "../Mesher/Models/VoxelGeometryLookUp";
import { Environment } from "@amodx/core/Environment/Environment";
import { WorldRegister } from "../World/WorldRegister";
import InitAnalyzerTasks from "../Tasks/Analyzer/InitTasks";
import InitUpdateTasks from "../Tasks/Update/InitTasks";
import InitPropagationTasks from "../Tasks/Propagation/InitTasks";
import InitMesherTasks from "../Mesher/InitTask";
import InitWorldGenerationTasks from "../Tasks/WorldGeneration/InitTasks";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitMesher from "../Mesher/InitMesher";
import InitArchiveTasks from "../World/Archive/InitTasks";
export async function StartContrusctor(data: {} = {}) {
  const DVEC = new DivineVoxelEngineConstructor();

  DivineVoxelEngineConstructor.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineConstructor.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", self, parent);

  let ready = false;
  VoxelGeometryLookUp.init();

  InitDataSync({
    onSync(data) {
      InitMesher(data.voxels.materials.palette, data.voxels.models);
      ready = true;
    },
  });

  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });

  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  InitArchiveTasks({ worldThread: DVEC.threads.world });
  InitWorldDataSync();
  InitAnalyzerTasks();
  InitPropagationTasks();
  InitMesherTasks(DVEC.threads.parent);
  InitUpdateTasks({
    onDone(tasks) {
      DVEC.threads.world.runTask("build-queue", [
        tasks.origin[0],
        tasks.bounds.getChunks(),
      ]);
    },
  });
  InitWorldGenerationTasks();
  return DVEC;
}
