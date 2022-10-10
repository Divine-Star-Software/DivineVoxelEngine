import { ThreadComm } from "../ThreadComm.js";
import { TCMessageHeaders, TCInternalMessages } from "../Constants/Messages.js";
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
    isReady() {
        return this.__ready;
    }
    sendReadySignal() {
        this.sendMessage(TCMessageHeaders.internal, [TCInternalMessages.IsReady]);
    }
    __onSetPortRun = (port) => { };
    isPortSet() {
        return Boolean(this.port);
    }
    onSetPort(set) {
        this.__onSetPortRun = set;
    }
    __handleMessage(data, event) {
        if (ThreadComm.__isInternalMessage(data)) {
            ThreadComm.__handleInternalMessage(data, event);
            this.onMessage(event);
            return;
        }
        if (ThreadComm.__isTasks(data)) {
            ThreadComm.__handleTasksMessage(data);
            this.onMessage(event);
            return;
        }
        if (this._manager) {
            if (this._manager.__isManagerMessage(data)) {
                this._manager.__handleManagerMessage(data, event);
            }
        }
        const message = data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message](data, event);
        }
        this.onMessage(event);
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
        this.messageFunctions[message] = run;
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
    runTasks(id, data, queue) {
        this.sendMessage(TCMessageHeaders.runTasks, [id, queue, data]);
    }
    __syncQueue(id, sab) {
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.syncQueue,
            id,
            sab,
        ]);
    }
    __unSyqncQueue(id) {
        this.sendMessage(TCMessageHeaders.internal, [
            TCInternalMessages.unSyncQueue,
            id,
        ]);
    }
    onMessage(event) { }
}
export function CreateComm(name, mergeObject) {
    const newCom = Object.assign(new CommBase(name), mergeObject);
    return newCom;
}
