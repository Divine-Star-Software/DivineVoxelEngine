//constants
import { TCMessageHeaders, TCInternalMessages } from "../Constants/Messages.js";
//classes
import { CommBase } from "../Comm/Comm.js";
import { QueueManager } from "../Queue/QueueManager.js";
import { ThreadComm } from "../ThreadComm.js";
export class CommManager {
    _totalComms = 0;
    _currentCom = 0;
    name = "";
    __comms = [];
    __data = {
        name: "",
        onPortSet: (port, commName) => { },
    };
    __queues = {};
    messageFunctions = {};
    constructor(data) {
        this.__data = data;
        this.name = data.name;
    }
    __throwError(message) {
        throw new Error(`[ThreadCommManager : ${this.__data.name}] ${message}`);
    }
    connectToCom(commToConnectTo) {
        for (const comm of this.__comms) {
            comm.connectToComm(commToConnectTo);
        }
    }
    destroyAll() {
        for (const comm of this.__comms) {
            comm.destroy();
        }
    }
    isReady() {
        let ready = true;
        for (const comm of this.__comms) {
            if (!comm.isReady())
                ready = false;
        }
        return ready;
    }
    waitTillAllAreReady() {
        const self = this;
        return new Promise((resolve, reject) => {
            const inte = setInterval(() => {
                if (this.isReady()) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    }
    addPort(port) {
        this._totalComms++;
        const newCommName = `${this.__data.name}-${this._totalComms}`;
        const newComm = new CommBase(newCommName, this.__data.name, this);
        ThreadComm.addComm(newComm);
        newComm.setPort(port);
        this.__data.onPortSet(port, newCommName);
        this.__comms.push(newComm);
        newComm.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.nameThread,
            newCommName,
            this._totalComms,
        ]);
    }
    addPorts(ports) {
        for (const port of ports) {
            this.addPort(port);
        }
    }
    addComms(comms) {
        this._totalComms += comms.length;
        this.__comms.push(...comms);
    }
    __isManagerMessage(data) {
        return this.messageFunctions[data[0]] !== undefined;
    }
    __handleManagerMessage(data, event) {
        if (!this.messageFunctions[data[0]])
            return;
        this.messageFunctions[data[0]].forEach((_) => _(data, event));
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] ??= [];
        this.messageFunctions[message].push(run);
    }
    sendMessageToAll(message, data = [], transfers) {
        for (const comm of this.__comms) {
            comm.sendMessage(message, data, transfers);
        }
    }
    runTasksForAll(id, data, transfers = [], queueId) {
        for (const comm of this.__comms) {
            comm.runTasks(id, data, transfers, queueId);
        }
    }
    runTask(id, data, transfers = [], threadNumber = -1, queueId) {
        if (threadNumber < 0) {
            const comm = this.__comms[this._currentCom];
            comm.runTasks(id, data, transfers, queueId);
            return this.__handleCount();
        }
        else {
            const comm = this.__comms[threadNumber];
            comm.runTasks(id, data, transfers, queueId);
            return threadNumber;
        }
    }
    runPromiseTasks(id, requestsID, onDone, data, transfers = [], threadNumber = -1) {
        if (threadNumber < 0) {
            const comm = this.__comms[this._currentCom];
            comm.runPromiseTasks(id, requestsID, onDone, data, transfers);
            return this.__handleCount();
        }
        else {
            const comm = this.__comms[threadNumber];
            comm.runPromiseTasks(id, requestsID, onDone, data, transfers);
            return threadNumber;
        }
    }
    __handleCount() {
        let countReturn = this._currentCom;
        this._currentCom++;
        if (this._currentCom >= this._totalComms) {
            this._currentCom = 0;
        }
        return countReturn;
    }
    addQueue(id, associatedTasksId, getQueueKey = null, beforeRun = (data) => data, afterRun = (data, thread) => { }, getThread = (data) => -1, getTransfers = (data) => []) {
        if (this.__queues[id]) {
            this.__throwError(`Queue with ${id} already exists.`);
        }
        const newQueue = new QueueManager(id, (data, queueId) => {
            data = beforeRun(data);
            const thread = this.runTask(associatedTasksId, data, getTransfers(data), getThread(data), queueId);
            afterRun(data, thread);
        }, this, getQueueKey);
        this.__queues[id] = newQueue;
        return newQueue;
    }
    getQueue(id) {
        const queue = this.__queues[id];
        if (!queue) {
            this.__throwError(`Queue with ${id} does not exists.`);
        }
        return queue;
    }
    __syncQueue(id, sab) {
        for (const comm of this.__comms) {
            comm.__syncQueue(id, sab);
        }
    }
    __unSyncQueue(id) {
        for (const comm of this.__comms) {
            comm.__unSyqncQueue(id);
        }
    }
    syncData(dataType, data) {
        for (const comm of this.__comms) {
            comm.syncData(dataType, data);
        }
    }
    unSyncData(dataType, data) {
        for (const comm of this.__comms) {
            comm.unSyncData(dataType, data);
        }
    }
}
