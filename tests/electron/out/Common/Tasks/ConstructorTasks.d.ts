import { AddToRebuildQueue, BuildTasks, PriorityTask, RunRebuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const ConstructorTasks: {
    runQueue: {
        build: {
            chunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RunRebuildTasks>;
        };
    };
    addToQueue: {
        rgb: {
            update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any>;
            remove: null;
        };
        build: {
            addToRebuildQueue: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<AddToRebuildQueue>;
        };
        buildChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PriorityTask<BuildTasks>>;
    };
};
