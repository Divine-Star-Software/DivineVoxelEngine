import { ConstructorQueues } from "../Queues/ConstructorQueues.js";
import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/ConstructorRemoteThreadTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { TasksTool } from "../../Tools/Tasks/TasksTool.js";
const tasks = TasksTool();
export const ConstructorTasks = {
    runQueue: {
        build: {
            chunk: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.runRebuildQue, (data) => {
                ConstructorQueues.build.chunk.run(data[0]);
            }),
        },
    },
    addToQueue: {
        rgb: {
            update: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.addToRGBLightUpdateQue, (data) => {
                ConstructorQueues.rgb.update.add(data);
            }),
            remove: null,
        },
        build: {
            addToRebuildQueue: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.addToRebuildQue, (data) => {
                ConstructorQueues.build.chunk.add({
                    data: [data[0], 1],
                    priority: data[2],
                }, data[1]);
            }),
        },
        buildChunk: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.buildChunk, (data) => {
            tasks.setPriority(data.priority);
            tasks.build.chunk.deferred.run(data.data, () => { });
        }),
    },
};
