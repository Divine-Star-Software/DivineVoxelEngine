import InitDataSync from "../Contexts/Base/Remote/Sync/InitDataSync"
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor";
import { Threads } from "@amodx/threads";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck";
import { VoxelGeometryLookUp } from "../Mesher/Models/VoxelGeometryLookUp";
import { Environment } from "@amodx/core/Environment/Environment";
import { WorldRegister } from "../Data/World/WorldRegister";
import InitAnalyzerTasks from "../Tasks/Analyzer/InitTasks";
import InitUpdateTasks from "../Tasks/Update/InitTasks";
import InitPropagationTasks from "../Tasks/Propagation/InitTasks";
import InitMesherTasks from "../Tasks/Mesher/InitTasks";
import InitWorldGenerationTasks from "../Tasks/WorldGeneration/InitTasks";

export async function StartContrusctor(data: {} = {}) {
  const DVEC = new DivineVoxelEngineConstructor();

  DivineVoxelEngineConstructor.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineConstructor.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", parent);

  let ready = false;
  VoxelGeometryLookUp.init();

  InitDataSync({
    onSync(data) {
      DVEC.mesher.init(data);
      ready = true;
    },
  });

  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });

  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  InitAnalyzerTasks();
  InitPropagationTasks();
  InitMesherTasks(DVEC.mesher);
  InitUpdateTasks({
    onDone(tasks) {
      DVEC.threads.world.runTasks("build-queue", [
        tasks.origin[0],
        tasks.bounds.getChunks(),
      ]);
    },
  });
  InitWorldGenerationTasks();
  return DVEC;
}
