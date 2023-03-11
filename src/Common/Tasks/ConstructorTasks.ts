import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/ConstructorRemoteThreadTasks.js";
import { ThreadComm } from "threadcomm"
import {
 BuildTasks,
 PriorityTask,
} from "Meta/Tasks/Tasks.types.js";
import { GetTasksTool } from "../../Tools/Tasks/TasksTool.js";

const tasks = GetTasksTool();
export const ConstructorTasks = {
  buildChunk: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
   ConstructorRemoteThreadTasks.buildChunk,
   (data) => {
    tasks.setPriority(data.priority);
    tasks.build.chunk.deferred.run(data.data, () => {});
   }
  ),
};
