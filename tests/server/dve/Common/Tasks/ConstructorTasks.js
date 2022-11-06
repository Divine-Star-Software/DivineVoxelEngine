import { ConstructorQueues } from "../Queues/ConstructorQueues.js";
import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export const ConstructorTasks = {
    runQueue: {
        rgb: {
            update: null,
            remove: null,
        },
        worldSun: {
            fill: null,
            columnFill: null,
            flood: null,
        },
        sun: {
            update: null,
            remove: null,
        },
        flow: {
            update: null,
            remove: null,
        },
        build: {
            chunk: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.runRebuildQue, (data) => {
                ConstructorQueues.build.chunk.run(data[0]);
            }),
        },
        generate: {
            chunk: null,
        },
    },
    addToQueue: {
        rgb: {
            update: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.addToRGBLightUpdateQue, (data) => {
                ConstructorQueues.rgb.update.add(data);
            }),
            remove: null,
        },
        worldSun: {
            fill: null,
            columnFill: null,
            flood: null,
        },
        sun: {
            update: null,
            remove: null,
        },
        flow: {
            update: null,
            remove: null,
        },
        build: {
            chunk: ThreadComm.registerTasks(ConstructorRemoteThreadTasks.addToRebuildQue, (data) => {
                ConstructorQueues.build.chunk.add([data[0], data[1], data[2], data[3], 1], data[4]);
            }),
        },
        generate: {
            chunk: null,
        },
    },
};
