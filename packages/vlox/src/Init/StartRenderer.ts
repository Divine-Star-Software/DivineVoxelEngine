import { DivineVoxelEngineRender, DVERInitData } from "../Contexts/Render";
import InitDataGenerator from "../Contexts/Base/Main/InitDataGenerator";
import { Threads, Thread, ThreadPool } from "@amodx/threads";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitRendererTasks from "../Renderer/InitTasks";
import InitMesher from "../Mesher/InitMesher";
import { InitVoxelDataProps } from "../Voxels/InitVoxelData";
import { MeshManager } from "../Renderer/MeshManager";
import { WorldRegister } from "../World/WorldRegister";
import { WorkItemProgress } from "../Util/WorkItemProgress";
type StartRendererProps = {
  getProgress?: (progress: WorkItemProgress) => void;
} & DVERInitData &
  InitVoxelDataProps;
export async function StartRenderer(initData: StartRendererProps) {
  const DVER = new DivineVoxelEngineRender();
  const progress = new WorkItemProgress();
  if (initData.getProgress) initData.getProgress(progress);
  progress.startTask("load");

  await Threads.init("render", window, "window");

  WorldRegister.proxy = true;
  DivineVoxelEngineRender.initialized = true;
  DVER.renderer = initData.renderer;
  MeshManager.sectorMeshes = initData.renderer.sectorMeshes;
  if (initData.nexusWorker) {
    DVER.threads.nexus.setPort(initData.nexusWorker);
    DVER.threads.addThread(DVER.threads.nexus);
  }

  DVER.settings.syncSettings(<any>initData);

  if (!(initData.worldWorker instanceof Worker)) {
    throw Error(
      "Supplied data for World Worker is not correct. Must be path to worker or a worker."
    );
  }
  DVER.threads.setThreadPort(DVER.threads.world.name, initData.worldWorker);

  if (
    Array.isArray(initData.mesherWorkers) &&
    initData.mesherWorkers[0] instanceof Worker
  ) {
    DVER.threads.setThreadPort(
      DVER.threads.meshers.name,
      initData.mesherWorkers
    );
  } else {
    throw Error(
      "Supplied data for the Mesher Workers is not correct. Must be path to worker or an array workers."
    );
  }

  if (
    Array.isArray(initData.generatorWorkers) &&
    initData.generatorWorkers[0] instanceof Worker
  ) {
    DVER.threads.setThreadPort(
      DVER.threads.generators.name,
      initData.generatorWorkers
    );
  } else {
    throw Error(
      "Supplied data for the Generator Workers is not correct. Must be path to worker or an array workers."
    );
  }

  const proms: Promise<any>[] = [];

  for (const thread of DVER.threads._threads) {
    if (thread.name == "window" || thread.name == "world") continue;
    if (thread instanceof ThreadPool) {
      for (const t of thread.getThreads()) {
        proms.push(t.waitTillTaskExist("sync-data"));
        DVER.threads.world.connectToThread(t);
      }
    }
    if (thread instanceof Thread) {
      proms.push(thread.waitTillTaskExist("sync-data"));
      DVER.threads.world.connectToThread(thread);
    }
  }
  proms.push(DVER.threads.world.waitTillTaskExist("sync-data"));

  progress.setStatus("Generate Data");
  await progress.wait(100);

  const syncData = InitDataGenerator({
    threads: {
      nexus: initData.nexusWorker ? true : false,
    },
    voxels: initData.voxels,
    substances: initData.substances || [],
    materials: initData.materials || [],
  });

  progress.setWorkLoad(5);
  progress.setStatus("Init Threads");
  await progress.wait(100);

  InitRendererTasks();
  InitWorldDataSync(DVER.threads.world);

  InitMesher(syncData.voxels.materials.palette, syncData.voxels.models);

  progress.completeWorkItems(1);
  progress.setStatus("Waiting For Threads");

  await Promise.all(proms);
  progress.completeWorkItems(1);
  progress.setStatus("Sending Data");
  await progress.wait(100);
  proms.length = 0;

  for (const thread of DVER.threads._threads) {
    if (thread.name == "window" || thread.name == "world") continue;
    if (thread instanceof ThreadPool) {
      for (const t of thread.getThreads()) {
        proms.push(t.runTaskAsync("sync-data", syncData));
      }
    }
    if (thread instanceof Thread) {
      proms.push(thread.runTaskAsync("sync-data", syncData));
    }
  }

  proms.push(DVER.threads.world.runTaskAsync("sync-data", syncData));
  await Promise.all(proms);
  progress.completeWorkItems(1);
  progress.setStatus("Init Renderer");
  await progress.wait(100);
  await DVER.renderer.init(DVER);
  progress.completeWorkItems(1);
  progress.setStatus("Done");
  await progress.wait(100);
  progress.endTask();

  return DVER;
}
