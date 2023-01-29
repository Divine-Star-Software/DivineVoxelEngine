import { BuildTasks, ExplosionTasks, GenerateTasks, PaintTasks, PriorityTask, UpdateTasksO, WorldSunTask } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    data: {
        syncTextures: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any>;
    };
    build: {
        chunk: {
            tasks: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PriorityTask<BuildTasks>>;
            run(data: BuildTasks): Promise<void>;
        };
        column: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<BuildTasks>;
    };
    voxelUpdate: {
        erase: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        paint: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PaintTasks>;
    };
    explosion: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<ExplosionTasks>;
    worldSun: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<WorldSunTask>;
    worldGen: {
        generate: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<GenerateTasks>;
    };
    anaylzer: {
        propagation: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    rgb: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    sun: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
};
