import { InitVoxelData } from "../Voxels/InitVoxelData";
import { DivineVoxelEngineRender, DVERInitData } from "../Contexts/Render";
import { VoxelData } from "../Voxels/Voxel.types";
import { VoxelGeometryData, VoxelModelData } from "../Models/VoxelModel.types";
import InitDataGenerator from "../Contexts/Base/Main/Generator/InitDataGenerator";
import { VoxelSubstanceData } from "Voxels/VoxelSubstances.types";
import { Thread, ThreadPool } from "@amodx/threads";
type StartRendererProps = {
  voxels: VoxelData[];
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
  substances?: VoxelSubstanceData[];
  materials?: { id: string }[];
} & DVERInitData;
export async function StartRenderer(initData: StartRendererProps) {
  const DVER = new DivineVoxelEngineRender();

  DivineVoxelEngineRender.initialized = true;
  DVER.renderer = initData.renderer;

  if (initData.nexusWorker) {
    DVER.threads.nexus.setPort(initData.nexusWorker);
    DVER.threads.addThread(DVER.threads.nexus);
  }

  await DVER.renderer.init(DVER);

  const t = performance.now();
  DVER.settings.syncSettings(<any>initData);
  await DVER.TC.init("render", "global");

  if (!(initData.worldWorker instanceof Worker)) {
    throw Error(
      "Supplied data for World Worker is not correct. Must be path to worker or a worker."
    );
  }
  DVER.threads.setThreadPort(DVER.threads.world.name, initData.worldWorker);

  if (
    Array.isArray(initData.constructorWorkers) &&
    initData.constructorWorkers[0] instanceof Worker
  ) {
    DVER.threads.setThreadPort(
      DVER.threads.construcotrs.name,
      initData.constructorWorkers
    );
  } else {
    throw Error(
      "Supplied data for the Constructor Workers is not correct. Must be path to worker or an array workers."
    );
  }
  const t2 = performance.now();

  console.log("DONE INIT VOXEL DATA", performance.now() - t2);
  const syncData = InitDataGenerator({
    threads: {
      nexus: initData.nexusWorker ? true : false,
    },
    voxels: initData.voxels,
    substances: initData.substances || [],
    materials: initData.materials || [],
    // voxelModels: modelSyncData,
  });

  const modelSyncData = await InitVoxelData({
    geometry: initData.geometry,
    models: initData.models,
    voxels: initData.voxels,
  });

  syncData.modelData = modelSyncData;
  //make sure threads are ready
  await DVER.threads.world.waitTillTasksExist("sync-data");
  for (const thread of DVER.threads.construcotrs.getThreads()) {
    await thread.waitTillTasksExist("sync-data");
  }
  //sync threads
  for (const thread of DVER.threads.construcotrs.getThreads()) {
    DVER.threads.world.connectToThread(thread);
  }
  if (initData.nexusWorker) {
    DVER.threads.world.connectToThread(DVER.threads.nexus);
  }

  //send data to threads
  for (const thread of DVER.threads.comms) {
    if (thread instanceof ThreadPool) {
      for (const com of thread.getThreads()) {
        com.runTasks("sync-data", syncData);
      }
    }
    if (thread instanceof Thread) {
      if (thread == DVER.threads.parent) continue;
      thread.runTasks("sync-data", syncData);
    }
  }

  console.log("DONE INIT DVE", performance.now() - t);

  window.addEventListener("beforeunload", () => {
    for (const thread of DVER.threads.comms) {
      if (thread instanceof ThreadPool) {
        thread.destroyAll();
      }
      if (thread instanceof Thread) {
        thread.destroy();
      }
    }
  });

  return DVER;
}
