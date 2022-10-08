import { Queue } from "../../Global/Util/Queue.js";
declare class QueueManager<T> {
    onRun: (data: T) => void;
    __queueData: Record<string, {
        queue: Queue<T>;
        map: Record<string, boolean>;
        stateSAB: SharedArrayBuffer;
        state: Uint32Array;
    }>;
    constructor(onRun: (data: T) => void);
    __getQueueKey(data: any): string;
    __getQueueData(id: string): {
        queue: Queue<T>;
        map: Record<string, boolean>;
        stateSAB: SharedArrayBuffer;
        state: Uint32Array;
    };
    addQueue(queueId: string): void;
    removeQueue(queueId: string): void;
    add(data: T, queueId?: string): void;
    run(queueId?: string, filter?: (data: T) => 0 | 1 | 2): void;
    awaitAll(queueId?: string): Promise<boolean>;
    isDone(queueId?: string): boolean;
}
export declare function GetQueue<T>(run: (data: T) => void): QueueManager<T>;
export {};
