import { Queue } from "../tools/Queue.js";
export class QueueManager {
    id;
    onRun;
    _manager;
    getQueueKey;
    __queueData = {};
    constructor(id, onRun, _manager, getQueueKey = null) {
        this.id = id;
        this.onRun = onRun;
        this._manager = _manager;
        this.getQueueKey = getQueueKey;
    }
    __getQueueKey(data) {
        if (this.getQueueKey !== null) {
            return this.getQueueKey(data);
        }
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
        if (this.__queueData[queueId])
            return false;
        this.__queueData[queueId] = {
            queue: new Queue(),
            map: {},
            stateSAB: sab,
            state: new Uint32Array(sab),
        };
        const syncId = this._getSyncId(queueId);
        this._manager.__syncQueue(syncId, sab);
        return true;
    }
    _getSyncId(queueId) {
        return `${this.id}-${queueId}`;
    }
    removeQueue(queueId) {
        if (!this.__queueData[queueId])
            return false;
        delete this.__queueData[queueId];
        const syncId = this._getSyncId(queueId);
        this._manager.__unSyncQueue(syncId);
        return true;
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
        const syncId = this._getSyncId(queueId);
        while (true) {
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
            this.onRun(data, syncId);
        }
        this.__queueData[queueId].map = {};
        if (filter) {
            this.__queueData[queueId].queue = queue;
            this.__queueData[queueId].map = newMap;
        }
    }
    runAndAwait(queueId = "main", filter) {
        this.run(queueId, filter);
        return this.awaitAll(queueId);
    }
    awaitAll(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return new Promise((resolve, reject) => {
            const inte = setInterval(() => {
                if (Atomics.load(queueData.state, 0) == 0) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    }
    onDone(queueId = "main", run) {
        const queueData = this.__getQueueData(queueId);
        const inte = setInterval(() => {
            if (Atomics.load(queueData.state, 0) == 0) {
                clearInterval(inte);
                run();
            }
        }, 1);
    }
    isDone(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return Atomics.load(queueData.state, 0) == 0;
    }
}
