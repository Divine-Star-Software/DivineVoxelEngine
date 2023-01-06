import { AddToRebuildQueue, RunRebuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const ConstructorTasks: {
    runQueue: {
        rgb: {
            update: null;
            remove: null;
        };
        worldSun: {
            fill: null;
            columnFill: null;
            flood: null;
        };
        sun: {
            update: null;
            remove: null;
        };
        flow: {
            update: null;
            remove: null;
        };
        build: {
            chunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RunRebuildTasks>;
        };
        generate: {
            chunk: null;
        };
    };
    addToQueue: {
        rgb: {
            update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any>;
            remove: null;
        };
        worldSun: {
            fill: null;
            columnFill: null;
            flood: null;
        };
        sun: {
            update: null;
            remove: null;
        };
        flow: {
            update: null;
            remove: null;
        };
        build: {
            addToRebuildQueue: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<AddToRebuildQueue>;
        };
        generate: {
            chunk: null;
        };
    };
};
