import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    build: {
        chunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<BuildTasks>;
        entity: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        item: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    rgb: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    worldSun: {
        fillWorldColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        updateAtMaxY: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        floodAtMaxY: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    sun: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    worldGen: {
        generate: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
};
