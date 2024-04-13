import type {
  DivineVoxelEngineRender,
  DVERInitData,
} from "./DivineVoxelEngineRender.js";

import { EngineSettingsData } from "Types/EngineSettings.types.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { CommBase, CommManager } from "@divinestar/threads/";

export default async function (
  DVER: DivineVoxelEngineRender,
  initData: DVERInitData
) {
  DVER.settings.syncSettings(<any>initData);
  await DVER.TC.$INIT("render", "global");

  if (!(initData.worldWorker instanceof Worker)) {
    throw Error(
      "Supplied data for World Worker is not correct. Must be path to worker or a worker."
    );
  }
  DVER.threads.setCommPort(DVER.threads.world.name, initData.worldWorker);

  if (
    Array.isArray(initData.constructorWorkers) &&
    initData.constructorWorkers[0] instanceof Worker
  ) {
    DVER.threads.setCommPort(
      DVER.threads.construcotrs.name,
      initData.constructorWorkers
    );
  } else {
    throw Error(
      "Supplied data for the Constructor Workers is not correct. Must be path to worker or an array workers."
    );
  }
  await DVER.threads.pipelines.setPorts.pipe(DVER.threads);
  for (const thread of DVER.threads.comms) {
    if (thread instanceof CommManager) {
      for (const com of thread.__comms) {
        await com.waitTillTasksExist("sync-settings");

        com.runTasks<EngineSettingsData>(
          "sync-settings",
          EngineSettings.getSettingsCopy()
        );
      }
    }
    if (thread instanceof CommBase) {
      if (thread == DVER.threads.parent) continue;

      await thread.waitTillTasksExist("sync-settings");

      thread.runTasks<EngineSettingsData>(
        "sync-settings",
        EngineSettings.getSettingsCopy()
      );
    }
  }

  const proms: Promise<any>[] = [];
  for (const com of DVER.threads.construcotrs.__comms) {
    proms.push(com.waitTillTasksExist("ready"));
  }

  await Promise.all(proms);
  await DVER.threads.world.waitTillTasksExist("sync-all-data");
  DVER.threads.world.runTasks("sync-all-data", true);
  await DVER.threads.pipelines.init.pipe(DVER.threads);
  window.addEventListener("beforeunload", () => {
    for (const thread of DVER.threads.comms) {
      if (thread instanceof CommManager) {
        thread.destroyAll();
      }
      if (thread instanceof CommBase) {
        thread.destroy();
      }
    }
  });
}
