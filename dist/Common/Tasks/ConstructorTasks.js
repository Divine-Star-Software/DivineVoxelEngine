import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/ConstructorRemoteThreadTasks.js";
import { ThreadComm } from "threadcomm";
import { TaskTool } from "../../Tools/Tasks/TasksTool.js";
const tasks = new TaskTool();
export const ConstructorTasks = {
    buildChunk: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.buildChunk, (data) => {
        tasks.setPriority(data.priority);
        tasks.build.chunk.deferred.run(data.data, () => { });
    }),
};
