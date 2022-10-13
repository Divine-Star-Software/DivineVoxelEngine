//constants
import { TCMessageHeaders, TCInternalMessages, TCDataSyncMessages, } from "./Constants/Messages.js";
//classes
import { Task } from "./Tasks/Tasks.js";
import { CommManager } from "./Manager/CommManager.js";
import { CommBase } from "./Comm/Comm.js";
import { SyncedQueue } from "./Queue/SyncedQueue.js";
import { DataSync } from "./Data/DataSync.js";
export const ThreadComm = {
    threadNumber: 0,
    threadName: "unamed-threadcomm-thread",
    environment: "browser",
    _comms: {},
    _commManageras: {},
    _tasks: {},
    _queues: {},
    _onDataSync: {},
    parent: new CommBase(""),
    __internal: {},
    __initalized: false,
    __expectedPorts: {},
    async $INIT(threadName) {
        this.threadName = threadName;
        this.parent.name = threadName;
        const port = await this.getWorkerPort();
        this.parent.setPort(port);
        this.__initalized = true;
    },
    getSyncedQueue(queueId) {
        return this._queues[queueId];
    },
    addComm(comm) {
        this._comms[comm.name] = comm;
    },
    createComm(name, mergeObject = {}) {
        const newCom = Object.assign(new CommBase(name), mergeObject);
        this._comms[name] = newCom;
        return newCom;
    },
    createCommManager(data) {
        const newCommManager = new CommManager(data);
        this._commManageras[data.name] = newCommManager;
        return newCommManager;
    },
    getComm(id) {
        return this._comms[id];
    },
    getCommManager(id) {
        return this._commManageras[id];
    },
    __throwError(message) {
        throw new Error(`[ThreadComm] ${message}`);
    },
    async getWorkerPort() {
        if (this.environment == "browser") {
            return self;
        }
        if (this.environment == "node") {
            try {
                //@ts-ignore
                const { parentPort } = require("worker_threads");
                return parentPort;
            }
            catch (error) {
                //@ts-ignore
                const { parentPort } = await import("worker_threads");
                return parentPort;
            }
        }
    },
    __handleInternalMessage(data, event) {
        //remove header
        const headerId = data.shift();
        //remove message
        const messageId = data.shift();
        this.__internal[headerId][messageId](data, event);
    },
    __isInternalMessage(data) {
        return this.__internal[data[0]] !== undefined;
    },
    async __handleTasksMessage(data) {
        //remove header
        data.shift();
        //remove tasks id
        const tasksId = data.shift();
        //remove queue id
        const queueId = data.shift();
        await this._tasks[tasksId].run(data[0]);
        //complete queue
        if (queueId) {
            this.getSyncedQueue(queueId).subtractFromCount();
        }
    },
    __isTasks(data) {
        return (data[0] == TCMessageHeaders.runTasks && this._tasks[data[1]] !== undefined);
    },
    registerTasks(id, run) {
        const tasks = new Task(id, run);
        this._tasks[id] = tasks;
        return tasks;
    },
    async __hanldeDataSyncMessage(data) {
        //remove header
        data.shift();
        //remove queue id
        const action = data.shift();
        //remove tasks id
        const dataTypeId = data.shift();
        const dataSync = this._onDataSync[dataTypeId];
        if (action == TCDataSyncMessages.SyncData) {
            dataSync.onSync(data);
        }
        if (action == TCDataSyncMessages.UnSyncData) {
            dataSync.onUnSync(data);
        }
    },
    __isDataSync(data) {
        return data[0] == TCMessageHeaders.dataSync;
    },
    listenForDataSync(dataType, onSync, onUnSync = (data) => { }) {
        this._onDataSync[dataType] = new DataSync(onSync, onUnSync);
    },
};
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
    ThreadComm.environment = "node";
}
const internal = {};
ThreadComm.__internal[TCMessageHeaders.internal] = internal;
internal[TCInternalMessages.connectPort] = (data, event) => {
    const threadName = data[0];
    const threadManager = data[1];
    let port;
    if (ThreadComm.environment == "browser") {
        port = event.ports[0];
    }
    else {
        port = data[2];
    }
    if (threadManager == "worker") {
        const comm = ThreadComm.getComm(threadName);
        comm.setPort(port);
    }
    if (threadManager != "worker") {
        const comm = ThreadComm.getCommManager(threadManager);
        comm.addPort(port);
    }
};
internal[TCInternalMessages.IsReady] = (data, event) => {
    const name = data[0];
    const comm = ThreadComm.getComm(name);
    if (!comm)
        return;
    comm.__ready = true;
};
internal[TCInternalMessages.nameThread] = (data, event) => {
    const name = data[0];
    const number = data[1];
    ThreadComm.threadName = name;
    ThreadComm.threadNumber = number;
};
internal[TCInternalMessages.syncQueue] = (data, event) => {
    const queueId = data[0];
    const queueSAB = data[1];
    ThreadComm._queues[queueId] = new SyncedQueue(queueId, queueSAB);
};
internal[TCInternalMessages.unSyncQueue] = (data, event) => {
    const queueId = data[0];
    delete ThreadComm._queues[queueId];
};
