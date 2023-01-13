import { ThreadComm } from "../ThreadComm.js";
import { TCMessageHeaders, TCInternalMessages, TCDataSyncMessages, } from "../Constants/Messages.js";
import { PromiseTasks } from "../Tasks/PromiseTasks.js";
export class CommBase {
    name;
    managerName;
    environment = "browser";
    __ready = false;
    port = null;
    messageFunctions = {};
    _manager = null;
    constructor(name, managerName = "worker", commManager = null) {
        this.name = name;
        this.managerName = managerName;
        this._manager = commManager;
    }
    destroy() {
        if (!this.port)
            return;
        if ("terminate" in this.port) {
            this.port.terminate();
        }
    }
    isReady() {
        return this.__ready;
    }
    __sendReadySignal() {
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.IsReady,
            ThreadComm.threadName,
        ]);
    }
    __onSetPortRun = (port) => { };
    isPortSet() {
        return Boolean(this.port);
    }
    onSetPort(set) {
        this.__onSetPortRun = set;
    }
    __handleMessage(data, event) {
        this.onMessage(data, event);
        if (ThreadComm.__isInternalMessage(data)) {
            ThreadComm.__handleInternalMessage(data, event);
            return;
        }
        if (ThreadComm.__isTasks(data)) {
            ThreadComm.__handleTasksMessage(data);
            return;
        }
        if (ThreadComm.__isDataSync(data)) {
            ThreadComm.__hanldeDataSyncMessage(data);
            return;
        }
        if (this._manager) {
            if (this._manager.__isManagerMessage(data)) {
                this._manager.__handleManagerMessage(data, event);
                return;
            }
        }
        const message = data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message].forEach((_) => _(data, event));
            return;
        }
    }
    setPort(port) {
        if (!port) {
            return this.__throwError("Port or worker must not be null.");
        }
        this.port = port;
        this.__onSetPortRun(port);
        if (this.environment == "browser") {
            port.onmessage = (event) => {
                this.__handleMessage(event.data, event);
            };
            port.onmessageerror = (event) => {
                console.log(event);
                this.__throwError("Error occured.");
            };
        }
        if (this.environment == "node") {
            port.on("message", (data) => {
                this.__handleMessage(data, data);
            });
            port.on("error", (data) => {
                console.log(data);
                this.__throwError("Error occured.");
            });
        }
        this.__sendReadySignal();
    }
    __throwError(message) {
        throw new Error(`[ThreadComm: ${this.name}] ${message}`);
    }
    sendMessage(message, data = [], transfers) {
        if (!this.port) {
            return this.__throwError("Port is not set.");
        }
        if (this.environment == "browser" && transfers) {
            this.port.postMessage([message, ...data], transfers);
            return;
        }
        this.port.postMessage([message, ...data]);
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] ??= [];
        this.messageFunctions[message].push(run);
    }
    connectToComm(commToConnectTo) {
        const channel = new MessageChannel();
        commToConnectTo.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.connectPort,
            this.name,
            this.managerName,
            channel.port1,
        ], [channel.port1]);
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.connectPort,
            commToConnectTo.name,
            commToConnectTo.managerName,
            channel.port2,
        ], [channel.port2]);
    }
    runTasks(id, data, transfers = [], queueId) {
        let mode = 0;
        let tid = "";
        if (queueId) {
            mode = 2;
            tid = queueId;
        }
        this.sendMessage(TCMessageHeaders.runTasks, [id, ThreadComm.threadName, mode, tid, data], transfers);
    }
    runPromiseTasks(id, requestsID, onDone, data, transfers = []) {
        PromiseTasks.addPromiseTakss(id, requestsID, onDone);
        this.sendMessage(TCMessageHeaders.runTasks, [id, ThreadComm.threadName, 1, requestsID, data], transfers);
    }
    __syncQueue(id, sab) {
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.syncQueue,
            ThreadComm.threadName,
            id,
            sab,
        ]);
    }
    __unSyqncQueue(id) {
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.unSyncQueue,
            ThreadComm.threadName,
            id,
        ]);
    }
    syncData(dataType, data, transfers) {
        this.sendMessage(TCMessageHeaders.dataSync, [TCDataSyncMessages.SyncData, dataType, data], transfers);
    }
    unSyncData(dataType, data, transfers) {
        this.sendMessage(TCMessageHeaders.dataSync, [TCDataSyncMessages.UnSyncData, dataType, data], transfers);
    }
    waitTillReady() {
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
    //meant to be over-ridden for debugging or custom behavior
    onMessage(data, event) { }
}
