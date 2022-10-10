import type { CommManager } from "../Manager/CommManager.js";
import { Queue } from "../tools/Queue.js";
export declare class QueueManager<T> {
    id: string;
    onRun: (data: T, queueId: string) => void;
    _manager: CommManager;
    __queueData: Record<string, {
        queue: Queue<T>;
        map: Record<string, boolean>;
        stateSAB: SharedArrayBuffer;
        state: Uint32Array;
    }>;
    constructor(id: string, onRun: (data: T, queueId: string) => void, _manager: CommManager);
    __getQueueKey(data: any): string;
    __getQueueData(id: string): {
        queue: Queue<T>;
        map: Record<string, boolean>;
        stateSAB: SharedArrayBuffer;
        state: Uint32Array;
    };
    addQueue(queueId: string): void;
    _getSyncId(queueId: string): string;
    removeQueue(queueId: string): void;
    add(data: T, queueId?: string): void;
    run(queueId?: string, filter?: (data: T) => 0 | 1 | 2): void;
    awaitAll(queueId?: string): Promise<boolean>;
    isDone(queueId?: string): boolean;
}
