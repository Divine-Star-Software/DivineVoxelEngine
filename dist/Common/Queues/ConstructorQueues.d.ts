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
        update: any;
        remove: any;
    };
    worldSun: any;
    voxelUpdate: {
        erase: any;
        paint: any;
    };
    sun: {
        update: any;
        remove: any;
    };
    explosion: {
        run: any;
    };
    flow: {
        update: any;
        remove: any;
    };
    build: {
        chunk: any;
    };
    generate: any;
};
