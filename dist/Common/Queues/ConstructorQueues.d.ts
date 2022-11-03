import type { BuildTasks, LightUpdateTask, UpdateTasks } from "Meta/Tasks/Tasks.types.js";
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
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
    };
    worldSun: {
        add(x: number, z: number, queueId?: string): void;
        run(): Promise<void>;
        __steps: {
            step1: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number]>;
            step2: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number, number]>;
            step3: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number, number]>;
        };
    };
    sun: {
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
        remove: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
    };
    build: {
        chunk: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<BuildTasks>;
    };
    generate: {
        chunk: import("../../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<LightUpdateTask>;
    };
};
