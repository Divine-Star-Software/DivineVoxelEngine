import { DivineVoxelEngineWorld } from "./index.js";
import { ThreadComm } from "@divinestar/threads/";
import { CreatePromiseCheck } from "@divinestar/utils/Intervals/CreatePromiseCheck.js";

export default function (DVEW: DivineVoxelEngineWorld): Promise<any> {
  return new Promise(async (resolve) => {
    let parent = "render";
    if (DivineVoxelEngineWorld.environment == "node") {
      parent = "server";
    }
    await ThreadComm.$INIT("world", parent);
    await DVEW.core.init();
    await CreatePromiseCheck({
      check: () => {
        return DVEW.core.threads.state.isReady();
      },
      checkInterval: 1,
    });

    ThreadComm.registerTasks("sync-all-data", async () => {
      await DVEW.core.dataSync.init(DVEW.core);
      console.log("SYNC ALL DATA IN THE WORLD WORKER");
      await DVEW.core.threads.constructors.__comms.map((comm) =>
        comm.waitTillTasksExist("ready")
      );

      await Promise.all(
        DVEW.core.threads.constructors.__comms.map(
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
