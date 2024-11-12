import { DivineVoxelEngineWorld } from "./index.js";
import { Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";
import { WorldLock } from "./Lock/WorldLock";
import { DataLoaderTool } from "../../DataLoader/World/Tools/DataLoaderTool";
import RegisterDataHooks from "./Data/WorldDataHooks.js";
export default function (DVEW: DivineVoxelEngineWorld): Promise<any> {
  return new Promise(async (resolve) => {
    let parent = "render";
    if (DivineVoxelEngineWorld.environment == "node") {
      parent = "server";
    }
    await Threads.init("world", parent);
    RegisterDataHooks();
    WorldLock.init(new DataLoaderTool());

    await CreatePromiseCheck({
      check: () => {
        return DVEW.threads.state.isReady();
      },
      checkInterval: 1,
    });

    Threads.registerTasks("sync-all-data", async () => {
      await DVEW.dataSync.init(DVEW);

      await DVEW.threads.constructors
        .getThreads()
        .map((comm) => comm.waitTillTasksExist("ready"));

      await Promise.all(
        DVEW.threads.constructors.getThreads().map(
          (comm) =>
            new Promise((resolve) => {
              comm.runPromiseTasks("ready", [], [], () => {
                resolve(true);
              });
            })
        )
      );

      resolve(true);
    });
  });
}
