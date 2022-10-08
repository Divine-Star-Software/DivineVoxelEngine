import { Queue } from "../../Global/Util/Queue.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { QueuesManager } from "./QueuesManager.js";
class QueueManager {
    onRun;
    __queueData = {};
    constructor(onRun) {
        this.onRun = onRun;
    }
    __getQueueKey(data) {
        if (Array.isArray(data)) {
            return data.toString();
        }
        if (typeof data == "object") {
            return JSON.stringify(data);
        }
        return String(data);
    }
    __getQueueData(id) {
        const queue = this.__queueData[id];
        if (!queue) {
            throw new Error(`Queue with id: ${id} does not exists.`);
        }
        return this.__queueData[id];
    }
    addQueue(queueId) {
        const sab = new SharedArrayBuffer(4);
        this.__queueData[queueId] = {
            queue: new Queue(),
            map: {},
            stateSAB: sab,
            state: new Uint32Array(sab),
        };
        QueuesManager._syncQueue(queueId, sab);
    }
    removeQueue(queueId) {
        if (!this.__queueData[queueId])
            return;
        delete this.__queueData[queueId];
        QueuesManager._unSyncQueue(queueId);
    }
    add(data, queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        const queueKey = this.__getQueueKey(data);
        if (queueData.map[queueKey])
            return;
        queueData.map[queueKey] = true;
        queueData.queue.enqueue(data);
    }
    run(queueId = "main", filter) {
        const reQueue = new Queue();
        const newMap = {};
        const queueData = this.__getQueueData(queueId);
        const queue = queueData.queue;
        const state = queueData.state;
        while (queue.first) {
            const data = queue.dequeue();
            if (!data)
                break;
            if (filter) {
                const filterReturn = filter(data);
                if (filterReturn == 0)
                    continue;
                if (filterReturn == 1) {
                    newMap[this.__getQueueKey(data)] = true;
                    reQueue.enqueue(data);
                    continue;
                }
            }
            Atomics.add(state, 0, 1);
            this.onRun(data);
        }
        if (filter) {
            this.__queueData[queueId].queue = queue;
            this.__queueData[queueId].map = newMap;
        }
    }
    awaitAll(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return Atomics.load(queueData.state, 0) == 0;
            },
            checkInterval: 1,
        });
    }
    isDone(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return Atomics.load(queueData.state, 0) == 0;
    }
}
export function GetQueue(run) {
    return new QueueManager(run);
}
