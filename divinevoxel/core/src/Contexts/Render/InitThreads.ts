import type {
  DivineVoxelEngineRender,
  DVERInitData,
} from "./DivineVoxelEngineRender.js";

import { EngineSettingsData } from "Types/EngineSettings.types.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { Thread, ThreadPool } from "@amodx/threads/";

export default async function (
  DVER: DivineVoxelEngineRender,
  initData: DVERInitData
) {
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

  for (const thread of DVER.threads.construcotrs.getThreads()) {
    await thread.waitTillTasksExist("thread-ready");
  }
  await DVER.threads.pipelines.setPorts.pipe(DVER.threads);
  for (const thread of DVER.threads.comms) {
    if (thread instanceof ThreadPool) {
      for (const com of thread.getThreads()) {
        await com.waitTillTasksExist("sync-settings");

        com.runTasks<EngineSettingsData>(
          "sync-settings",
          EngineSettings.getSettingsCopy()
        );
      }
    }
    if (thread instanceof Thread) {
      if (thread == DVER.threads.parent) continue;

      await thread.waitTillTasksExist("sync-settings");

      thread.runTasks<EngineSettingsData>(
        "sync-settings",
        EngineSettings.getSettingsCopy()
      );
    }
  }
  const proms: Promise<any>[] = [];
  for (const com of DVER.threads.construcotrs.getThreads()) {
    proms.push(com.waitTillTasksExist("ready"));
  }

  await Promise.all(proms);
  await DVER.threads.world.waitTillTasksExist("sync-all-data");
  DVER.threads.world.runTasks("sync-all-data", true);
  await DVER.threads.pipelines.init.pipe(DVER.threads);
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
}
