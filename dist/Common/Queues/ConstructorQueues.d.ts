import { BuildTasks, GenerateTasks, UpdateTasks, PriorityTask } from "Meta/Tasks/Tasks.types.js";
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
    worldSun: import("threadcomm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
    propagation: import("threadcomm/Queue/QueueManager.js").QueueManager<UpdateTasks>;
    build: {
        chunk: import("threadcomm/Queue/QueueManager.js").QueueManager<PriorityTask<BuildTasks>>;
    };
    generate: import("threadcomm/Queue/QueueManager.js").QueueManager<GenerateTasks>;
    decorate: import("threadcomm/Queue/QueueManager.js").QueueManager<GenerateTasks>;
};
