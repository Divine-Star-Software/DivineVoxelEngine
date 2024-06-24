import { DivineVoxelEngineWorld } from "./index.js";
import { Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";

export default function (DVEW: DivineVoxelEngineWorld): Promise<any> {
  return new Promise(async (resolve) => {
    let parent = "render";
    if (DivineVoxelEngineWorld.environment == "node") {
      parent = "server";
    }
    await Threads.init("world", parent);
    await DVEW.core.init();
    await CreatePromiseCheck({
      check: () => {
        return DVEW.core.threads.state.isReady();
      },
      checkInterval: 1,
    });

    Threads.registerTasks("sync-all-data", async () => {
      await DVEW.core.dataSync.init(DVEW.core);

      await DVEW.core.threads.constructors.getThreads().map((comm) =>
        comm.waitTillTasksExist("ready")
      );

      await Promise.all(
        DVEW.core.threads.constructors.getThreads().map(
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
