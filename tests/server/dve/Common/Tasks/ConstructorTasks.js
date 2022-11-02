import { ConstructorQueues } from "../Queues/ConstructorQueues.js";
import { WorldTasks } from "../Threads/Contracts/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { CCM } from "../Threads/Constructor/ConstructorComm.js";
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
            chunk: ThreadComm.registerTasks(WorldTasks.runRebuildQue, (data) => {
                ConstructorQueues.build.chunk.run(data[0]);
            }),
        },
        generate: {
            chunk: null,
        },
    },
    addToQueue: {
        rgb: {
            update: ThreadComm.registerTasks(WorldTasks.addToRGBLightUpdateQue, (data) => {
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
            chunk: ThreadComm.registerTasks(WorldTasks.addToRebuildQue, (data) => {
                ConstructorQueues.build.chunk.add([data[0], data[1], data[2], data[3], 1], data[4]);
            }),
        },
        generate: {
            chunk: null,
        },
    },
};
CCM.listenForMessage(WorldTasks.addToRebuildQue, (data) => {
    const x = data[1];
    const y = data[2];
    const z = data[3];
    const substance = data[4];
    ConstructorQueues.build.chunk.add([0, x, y, z, 1]);
});
CCM.listenForMessage(WorldTasks.runRebuildQue, () => {
    ConstructorQueues.build.chunk.run();
});
/*
CCM.listenForMessage(WorldTasks.addToRGBLightUpdateQue, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 ConstructorQueues.rgb.update.add([x, y, z]);
});
 */
