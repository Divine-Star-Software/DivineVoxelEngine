import { AddToRebuildQueue, BuildTasks, PriorityTask, RunRebuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const ConstructorTasks: {
    runQueue: {
        build: {
            chunk: import("threadcomm").Task<RunRebuildTasks>;
        };
    };
    addToQueue: {
        rgb: {
            update: import("threadcomm").Task<any>;
            remove: null;
        };
        build: {
            addToRebuildQueue: import("threadcomm").Task<AddToRebuildQueue>;
        };
        buildChunk: import("threadcomm").Task<PriorityTask<BuildTasks>>;
    };
};
