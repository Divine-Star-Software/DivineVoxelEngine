import type { CommPortTypes, NodeWorker } from "../Meta/Comm/Comm.types";
import type { MessageFunction, MessageRecord } from "../Meta/Util.types.js";
import type { CommManager } from "../Manager/CommManager.js";
import { ThreadComm } from "../ThreadComm.js";
import {
	TCMessageHeaders,
	TCInternalMessages,
	TCDataSyncMessages,
} from "../Constants/Messages.js";

export class CommBase {
	environment: "node" | "browser" = "browser";
	__ready = false;
	port: CommPortTypes | null = null;
	messageFunctions: MessageRecord = {};
	_manager: CommManager | null = null;

	constructor(
		public name: string,
		public managerName = "worker",
		commManager: CommManager | null = null
	) {
		this._manager = commManager;
	}

	destroy() {
		if (!this.port) return;
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

	__onSetPortRun: (port: CommPortTypes) => void = (port) => {};

	isPortSet() {
		return Boolean(this.port);
	}

	onSetPort(set: (port: CommPortTypes) => void) {
		this.__onSetPortRun = set;
	}

	__handleMessage(data: any, event: any) {
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
		if (ThreadComm.__isDataSync(data)) {
			ThreadComm.__hanldeDataSyncMessage(data);
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

	setPort(port: CommPortTypes) {
		if (!port) {
			return this.__throwError("Port or worker must not be null.");
		}
		this.port = port;
		this.__onSetPortRun(port);
		if (this.environment == "browser") {
			(port as MessagePort).onmessage = (event: MessageEvent) => {
				this.__handleMessage(event.data, event);
			};
			(port as MessagePort).onmessageerror = (event: MessageEvent) => {
				console.log(event);
				this.__throwError("Error occured.");
			};
		}
		if (this.environment == "node") {
			(port as NodeWorker).on("message", (data: any[]) => {
				this.__handleMessage(data, data);
			});
			(port as NodeWorker).on("error", (data: any[]) => {
				console.log(data);
				this.__throwError("Error occured.");
			});
		}
		this.__sendReadySignal();
	}

	__throwError(message: string) {
		throw new Error(`[ThreadComm: ${this.name}] ${message}`);
	}

	sendMessage(message: string | number, data: any[] = [], transfers?: any[]) {
		if (!this.port) {
			return this.__throwError("Port is not set.");
		}
		if (this.environment == "browser" && transfers) {
			this.port.postMessage([message, ...data], transfers);
			return;
		}
		this.port.postMessage([message, ...data]);
	}

	listenForMessage(message: string | number, run: MessageFunction) {
		this.messageFunctions[message] = run;
	}

	connectToComm(commToConnectTo: CommBase) {
		const channel = new MessageChannel();
		commToConnectTo.sendMessage(
			TCMessageHeaders.internal,
			[
				TCInternalMessages.connectPort,
				this.name,
				this.managerName,
				channel.port1,
			],
			[channel.port1]
		);
		this.sendMessage(
			TCMessageHeaders.internal,
			[
				TCInternalMessages.connectPort,
				commToConnectTo.name,
				commToConnectTo.managerName,
				channel.port2,
			],
			[channel.port2]
		);
	}

	runTasks<T>(id: string | number, data: T, transfers: any[] = [], queue?: string) {
		this.sendMessage(TCMessageHeaders.runTasks, [id, queue, data], transfers);
	}

	__syncQueue(id: string, sab: SharedArrayBuffer) {
		this.sendMessage(TCMessageHeaders.internal, [
			TCInternalMessages.syncQueue,
			id,
			sab,
		]);
	}

	__unSyqncQueue(id: string) {
		this.sendMessage(TCMessageHeaders.internal, [
			TCInternalMessages.unSyncQueue,
			id,
		]);
	}

	syncData<T>(dataType: string, data: T, transfers?: any[]) {
		this.sendMessage(
			TCMessageHeaders.dataSync,
			[TCDataSyncMessages.SyncData, dataType, data],
			transfers
		);
	}

	unSyncData<T>(dataType: string, data: T, transfers?: any[]) {
		this.sendMessage(
			TCMessageHeaders.dataSync,
			[TCDataSyncMessages.SyncData, dataType, data],
			transfers
		);
	}

	waitTillReady() {
		const self = this;
		return new Promise<boolean>((resolve, reject) => {
			const inte = setInterval(() => {
				if (this.isReady()) {
					clearInterval(inte);
					resolve(true);
				}
			}, 1);
		});
	}

	//meant to be over-ridden for debugging or custom behavior
	onMessage(event: any) {}
}
