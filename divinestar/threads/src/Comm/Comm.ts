import type { CommPortTypes, NodeWorker } from "../Meta/Comm/Comm.types";
import type { MessageFunction, MessageRecord } from "../Meta/Util.types.js";
import type { CommManager } from "../Manager/CommManager.js";
import { ThreadComm } from "../ThreadComm.js";
import { TCMessageHeaders, TCInternalMessages } from "../Internal/Messages.js";
import { PromiseTasks } from "../Tasks/PromiseTasks.js";
import { InternalTasks } from "../Internal/InternalTasks.js";

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
		return this.isPortSet();
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
		this.onMessage(data, event);

		if (InternalTasks.isInternal(data)) {
			return InternalTasks.runInternal(data, event);
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
		this.messageFunctions[message] ??= [];
		this.messageFunctions[message].push(run);
	}

	connectToComm(commToConnectTo: CommBase) {
		const channel = new MessageChannel();
		commToConnectTo.__sendInternalMessage(
			TCInternalMessages.connectPort,
			[this.name, this.managerName, channel.port1],
			[channel.port1]
		);

		this.__sendInternalMessage(
			TCInternalMessages.connectPort,
			[commToConnectTo.name, commToConnectTo.managerName, channel.port2],
			[channel.port2]
		);
	}

	runTasks<T>(
		id: string | number,
		data: T,
		transfers: any[] = [],
		queueId?: string
	) {
		let mode = 0;
		let tid = "";
		if (queueId) {
			mode = 2;
			tid = queueId;
		}
		this.__sendInternalMessage(
			TCInternalMessages.runTasks,
			[id, ThreadComm.threadName, mode, tid, data],
			transfers
		);
	}

	waitTillTasksExist(id: string) {
		return new Promise((resolve) => {
			const inte = setInterval(() => {
				this.tasksExist(id, (exists) => {
					if (exists) {
						resolve(true);
						clearInterval(inte);
					}
				});
			}, 10);
		});
	}

	tasksExist(id: string, onDone: (exist: boolean) => void) {
		const promiseId = `${this.name}-${id}-${Date.now()}`;

		this.__sendInternalMessage(TCInternalMessages.checkTasks, [
			id,
			ThreadComm.threadName,
			promiseId,
		]);

		PromiseTasks.addPromiseTakss("tasks-check", promiseId, (data: boolean) => {
			onDone(data);
		});
	}

	runPromiseTasks<T>(
		id: string | number,
		data: T,
		transfers: any[] = [],
		onDone: (data: any) => void
	) {
		const requestsID = ThreadComm.crypto.randomUUID();
		PromiseTasks.addPromiseTakss(id, requestsID, onDone);
		this.__sendInternalMessage(
			TCInternalMessages.runTasks,
			[id, ThreadComm.threadName, 1, requestsID, data],
			transfers
		);
	}

	runAsyncTasks<T = any, K = any>(
		id: string | number,
		data: T,
		transfers: any[] = []
	): Promise<K> {
		return new Promise<K>((resolve) => {
			this.runPromiseTasks(id, data, transfers, (data) => {
				resolve(data);
			});
		});
	}

	__sendInternalMessage(id: number, data: any = [], transfers: any = []) {
		this.sendMessage(TCMessageHeaders.internal, [id, ...data], transfers);
	}

	__syncQueue(id: string | number, sab: SharedArrayBuffer) {
		this.sendMessage(TCMessageHeaders.internal, [
			TCInternalMessages.syncQueue,
			ThreadComm.threadName,
			id,
			sab,
		]);
	}

	__unSyqncQueue(id: string | number) {
		this.sendMessage(TCMessageHeaders.internal, [
			TCInternalMessages.unSyncQueue,
			ThreadComm.threadName,
			id,
		]);
	}

	syncData<T>(dataType: string | number, data: T, transfers?: any[]) {
		this.__sendInternalMessage(
			TCInternalMessages.SyncData,
			[dataType, data],
			transfers
		);
	}

	unSyncData<T>(dataType: string | number, data: T, transfers?: any[]) {
		this.__sendInternalMessage(
			TCInternalMessages.UnSyncData,
			[dataType, data],
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
	onMessage(data: any, event: any) {}
}
