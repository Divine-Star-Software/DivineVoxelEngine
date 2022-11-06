import type { BuildTasks, ExplosionTasks, LightUpdateTask, PaintTasks, UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
export declare const ConstructorQueues: {
    $INIT(): void;
    _queueMap: Map<string | number, number>;
    addQueue(queueKey: string | number): boolean;
    removeQueue(queueKey: string | number): boolean;
    /**# Filter Queues
     * ---
     * Go through each current queue. IF the passed fucntion returns false it will remove that queue.
     * @param filter
     */
    filterQueues(filter: (queueKey: string | number) => boolean): void;
    /**# Filter Old Queues
     * ---
     * Will remove queues older then 10 minutes.
     * @param maxTime Max time in miliseconds.
     */
    filterOldQueues(maxTime?: number): void;
    rgb: {
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
    };
    worldSun: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
    voxelUpdate: {
        erease: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
        paint: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<PaintTasks>;
    };
    sun: {
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
    };
    explosion: {
        run: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<ExplosionTasks>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasksO>;
    };
    build: {
        chunk: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<BuildTasks>;
    };
    generate: {
        chunk: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<LightUpdateTask>;
    };
};
