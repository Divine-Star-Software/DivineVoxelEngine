import { BuildTasks, ExplosionTasks, GenerateTasks, PaintTasks, PriorityTask, UpdateTasksO, WorldSunTask } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    data: {
        syncTextures: import("threadcomm").Task<any>;
    };
    build: {
        chunk: {
            tasks: import("threadcomm").Task<PriorityTask<BuildTasks>>;
            run(data: BuildTasks): Promise<void>;
        };
        column: import("threadcomm").Task<BuildTasks>;
    };
    voxelUpdate: {
        update: import("threadcomm").Task<UpdateTasksO>;
        erase: import("threadcomm").Task<UpdateTasksO>;
        paint: import("threadcomm").Task<PaintTasks>;
    };
    explosion: import("threadcomm").Task<ExplosionTasks>;
    worldSun: import("threadcomm").Task<WorldSunTask>;
    worldGen: {
        generate: import("threadcomm").Task<GenerateTasks>;
    };
    anaylzer: {
        propagation: import("threadcomm").Task<UpdateTasksO>;
        update: import("threadcomm").Task<UpdateTasksO>;
    };
};
