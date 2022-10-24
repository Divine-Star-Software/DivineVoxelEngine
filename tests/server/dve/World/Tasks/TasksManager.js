import { QueuesManager } from "../Queues/QueuesManager.js";
import { WorldTasks } from "../../Data/Constants/InterComms/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export const TasksManager = {
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
                if (!data) {
                    data = "main";
                }
            }),
        },
        generate: {
            chunk: null,
        },
    },
    addToQueue: {
        rgb: {
            update: ThreadComm.registerTasks(WorldTasks.addToRGBLightUpdateQue, (data) => {
                QueuesManager.rgb.update.add(data);
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
            chunk: ThreadComm.registerTasks(WorldTasks.runRebuildQue, (data) => {
                if (!data) {
                    data = "main";
                }
            }),
        },
        generate: {
            chunk: null,
        },
    },
};
