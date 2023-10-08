import { DivineVoxelEngineWorld } from "../index.js";
import { ThreadComm } from "@divinestar/threads/";
import { RegisterDataHooks } from "../Hooks/Data/WorldDataHooks.js";
import { WorldThreadState } from "../Threads/WorldThreadState.js";
import { DataSync } from "../Data/DataSync.js";
import { WorldLock } from "../Lock/WorldLock.js";
import { DataLoaderTool } from "../../Tools/Loader/DataLoaderTool.js";

export function InitWorldWorker(DVEW: DivineVoxelEngineWorld): Promise<any> {
 return new Promise(async (resolve) => {
  let parent = "render";
  if (DivineVoxelEngineWorld.environment == "node") {
   parent = "server";
  }
  await ThreadComm.$INIT("world", parent);
  RegisterDataHooks();

  await DVEW.UTIL.createPromiseCheck({
   check: () => {
    return WorldThreadState.isReady();
   },
   checkInterval: 1,
  });

  ThreadComm.registerTasks("sync-all-data", async () => {
   DataSync.$INIT();
   await DVEW.ccm.__comms.map((comm) => comm.waitTillTasksExist("ready"));

   await Promise.all(
    DVEW.ccm.__comms.map(
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

  WorldLock.$INIT(new DataLoaderTool());
 });
}
