import type { BuildTasks, ExplosionTasks, PaintTasks, UpdateTasksO, WorldSunTask } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    build: {
        chunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<BuildTasks>;
        entity: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        item: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
    voxelUpdate: {
        erease: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        paint: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PaintTasks>;
    };
    rgb: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    worldSun: {
        run: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<WorldSunTask>;
    };
    sun: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    explosion: {
        run: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<ExplosionTasks>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    worldGen: {
        generate: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
    };
};
