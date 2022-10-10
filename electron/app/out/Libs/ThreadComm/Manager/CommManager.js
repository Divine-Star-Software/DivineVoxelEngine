//constants
import { TCMessageHeaders, TCInternalMessages } from "../Constants/Messages.js";
//classes
import { CommBase } from "../Comm/Comm.js";
import { QueueManager } from "../Queue/QueueManager.js";
export class CommManager {
    _totalComms = 0;
    _currentCom = 0;
    __comms = [];
    __data = {
        name: "",
        onPortSet: (port, commName) => { },
    };
    __queues = {};
    messageFunctions = {};
    constructor(data) {
        this.__data = data;
    }
    __throwError(message) {
        throw new Error(`[ThreadCommManager : ${this.__data.name}] ${message}`);
    }
    connectToCom(commToConnectTo) {
        for (const comm of this.__comms) {
            comm.connectToComm(commToConnectTo);
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
    addPort(port) {
        this._totalComms++;
        const newCommName = `${this.__data.name}-${this._totalComms}`;
        const newComm = new CommBase(newCommName, this.__data.name, this);
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
        this.messageFunctions[data[0]](data, event);
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] = run;
    }
    sendMessageToAll(message, data = [], transfers) {
        for (const comm of this.__comms) {
            comm.sendMessage(message, data, transfers);
        }
    }
    runTasksForAll(id, data, queue) {
        for (const comm of this.__comms) {
            comm.runTasks(id, data, queue);
        }
    }
    runTask(id, data, queue) {
        const comm = this.__comms[this._currentCom];
        comm.runTasks(id, data, queue);
        return this.__handleCount();
    }
    __handleCount() {
        let countReturn = this._currentCom;
        this._currentCom++;
        if (this._currentCom >= this._totalComms) {
            this._currentCom = 0;
        }
        return countReturn;
    }
    addQueue(id, associatedTasksId) {
        if (this.__queues[id]) {
            this.__throwError(`Queue with ${id} already exists.`);
        }
        const newQueue = new QueueManager(id, (data, queueId) => {
            this.runTask(associatedTasksId, data, queueId);
        }, this);
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
}
