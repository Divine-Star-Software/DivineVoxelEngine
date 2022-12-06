//types
import type { CommManagerData } from "./Meta/Manager/Manager.types.js";
import type { MessageFunction } from "./Meta/Util.types.js";
//constants
import {
	TCMessageHeaders,
	TCInternalMessages,
	TCDataSyncMessages,
} from "./Constants/Messages.js";
//classes
import { Task } from "./Tasks/Tasks.js";
import { CommManager } from "./Manager/CommManager.js";
import { CommBase } from "./Comm/Comm.js";
import { SyncedQueue } from "./Queue/SyncedQueue.js";
import { DataSync } from "./Data/DataSync.js";
import { PromiseTasks } from "./Tasks/PromiseTasks.js";

export const ThreadComm = {
	threadNumber: 0,
	threadName: "unamed-threadcomm-thread",
	environment: <"node" | "browser">"browser",
	_comms: <Record<string, CommBase>>{},
	_commManageras: <Record<string, CommManager>>{},
	_tasks: <Record<string, Task<any>>>{},
	_queues: <Map<string, Map<string, SyncedQueue>>>new Map(),
	_onDataSync: <Record<string, DataSync<any, any>>>{},
	parent: new CommBase(""),

	__internal: <
		Record<number, Record<number, (data: any, event: any) => void>>
	>{},

	__initalized: false,
	__expectedPorts: <Record<string, boolean>>{},

	async $INIT(threadName: string) {
		this.threadName = threadName;
		this.parent.name = threadName;
		const port = await this.getWorkerPort();
		this.parent.setPort(port);
		this.__initalized = true;
	},

	getSyncedQueue(threadId: string, queueId: string) {
		if (!this._queues.has(threadId)) return;
		return this._queues.get(threadId)?.get(queueId);
	},

	addComm(comm: CommBase) {
		this._comms[comm.name] = comm;
	},

	createComm<T>(name: string, mergeObject: T = <T>{}): T & CommBase {
		const newCom = Object.assign<CommBase, typeof mergeObject>(
			new CommBase(name),
			mergeObject
		);
		this._comms[name] = newCom;
		return newCom;
	},

	createCommManager(data: CommManagerData) {
		const newCommManager = new CommManager(data);
		this._commManageras[data.name] = newCommManager;
		return newCommManager;
	},

	getComm(id: string) {
		return this._comms[id];
	},

	getCommManager(id: string) {
		return this._commManageras[id];
	},

	__throwError(message: string) {
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
			} catch (error) {
				//@ts-ignore
				const { parentPort } = await import("worker_threads");
				return parentPort;
			}
		}
	},
	__handleInternalMessage(data: any[], event: any) {
		//remove header
		const headerId = data.shift();
		//remove message
		const messageId = data.shift();

		this.__internal[headerId][messageId](data, event);
	},
	__isInternalMessage(data: any[]) {
		return this.__internal[data[0]] !== undefined;
	},

	__handleTasksDone(
		tasksId: string,
		mode: number,
		threadId: string,
		tid: string,
		tasksData: any
	) {
		if (mode == 1) {
			const comm = this.getComm(threadId);
			comm.sendMessage(TCMessageHeaders.internal, [
				TCInternalMessages.completeTasks,
				tasksId,
				tid,
				tasksData,
			]);
		}
		if (mode == 2) {
			//complete queue
			if (tid && threadId) {
				const queue = this.getSyncedQueue(threadId, tid);
				if (queue) {
					queue.subtractFromCount();
				}
			}
		}
	},

	async __handleTasksMessage(data: any[]) {
		//remove header
		data.shift();
		//remove tasks id
		const tasksId = data.shift();
		//remove thread id
		const threadId = data.shift();
		//remove queue id
		const mode = data.shift();
		//remove queue id
		const tid = data.shift();

		const takss = this._tasks[tasksId];

		if (takss.mode == "async") {
			const tasksData = await this._tasks[tasksId].run(data[0]);
			this.__handleTasksDone(tasksId, mode, threadId, tid, tasksData);
		}
		if (takss.mode == "deffered") {
			const tasksData = await this._tasks[tasksId].run(data[0], () => {
				this.__handleTasksDone(tasksId, mode, threadId, tid, tasksData);
			});
		}
	},
	__isTasks(data: any[]) {
		return (
			data[0] == TCMessageHeaders.runTasks && this._tasks[data[1]] !== undefined
		);
	},

	registerTasks<T>(
		id: string | number,
		run: (data: T, onDone?: Function) => void,
		mode: "async" | "deffered" = "async"
	) {
		const tasks = new Task<T>(id, run, mode);
		this._tasks[id] = tasks;
		return tasks;
	},

	async __hanldeDataSyncMessage(data: any[]) {
		//remove header
		data.shift();

		//remove queue id
		const action = data.shift();
		//remove tasks id
		const dataTypeId = data.shift();
		const dataSync = this._onDataSync[dataTypeId];
		//get the sync data
		const syncData = data.shift();
		if (action == TCDataSyncMessages.SyncData) {
			dataSync.sync(syncData);
		}
		if (action == TCDataSyncMessages.UnSyncData) {
			dataSync.unSync(syncData);
		}
	},
	__isDataSync(data: any[]) {
		return data[0] == TCMessageHeaders.dataSync;
	},

	onDataSync<T, K>(
		dataType: string | number,
		onSync?: (data: T) => void,
		onUnSync?: (data: K) => void
	) {
		const sync = new DataSync<T, K>();
		if (onSync) {
			sync.addOnSync(onSync);
		}
		if (onUnSync) {
			sync.addOnUnSync(onUnSync);
		}
		this._onDataSync[dataType] = sync;
		return sync;
	},
};
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
	ThreadComm.environment = "node";
}

const internal: Record<number, MessageFunction> = {};
ThreadComm.__internal[TCMessageHeaders.internal] = internal;
internal[TCInternalMessages.connectPort] = (data, event) => {
	const threadName = data[0];
	const threadManager = data[1];
	let port: MessagePort;
	if (ThreadComm.environment == "browser") {
		port = (event as MessageEvent).ports[0];
	} else {
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
internal[TCInternalMessages.IsReady] = (data) => {
	const name = data[0];
	const comm = ThreadComm.getComm(name);
	if (!comm) return;
	comm.__ready = true;
};
internal[TCInternalMessages.nameThread] = (data) => {
	const name = data[0];
	const number = data[1];
	ThreadComm.threadName = name;
	ThreadComm.threadNumber = number;
};
internal[TCInternalMessages.syncQueue] = (data) => {
	const threadName = data[0];
	const queueId = data[1];
	const queueSAB = data[2];
	if (!ThreadComm._queues.has(threadName)) {
		ThreadComm._queues.set(threadName, new Map());
	}
	//@ts-ignore
	ThreadComm._queues
		.get(threadName)
		.set(queueId, new SyncedQueue(queueId, queueSAB));
};
internal[TCInternalMessages.unSyncQueue] = (data) => {
	const threadName = data[0];
	const queueId = data[1];
	if (!ThreadComm._queues.has(threadName)) {
		return;
	}
	//@ts-ignore
	ThreadComm._queues.get(threadName).delete(queueId);
};
internal[TCInternalMessages.completeTasks] = (data) => {
	const tasksId = data[0];
	const requestsId = data[1];
	const tasksData = data[2];
	PromiseTasks.completePromiseTasks(tasksId, requestsId, tasksData);
};
