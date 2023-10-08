import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/ConstructorRemoteThreadTasks.js";
import { ThreadComm } from "@divinestar/threads/"
import {
 BuildTasks,
 PriorityTask,
} from "Types/Tasks/Tasks.types.js";
import { TaskTool } from "../../Tools/Tasks/TasksTool.js";

const tasks = new TaskTool();
export const ConstructorTasks = {
  buildChunk: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
   ConstructorRemoteThreadTasks.buildChunk,
   (data) => {
    tasks.setPriority(data.priority);
    tasks.build.chunk.deferred.run(data.data, () => {});
   }
  ),
};
