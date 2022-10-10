//types
import type { CommManagerData } from "./Meta/Manager/Manager.types.js";
import type { MessageFunction } from "./Meta/Util.types.js";
//constants
import { TCMessageHeaders, TCInternalMessages } from "./Constants/Messages.js";
//classes
import { Task } from "./Tasks/Tasks.js";
import { CommManager } from "./Manager/CommManager.js";
import { CommBase } from "./Comm/Comm.js";
import { SyncedQueue } from "./Queue/SyncedQueue.js";
export const ThreadComm = {
	threadNumber: 0,
	threadName: "unamed-threadcomm-thread",
	environment: <"node" | "browser">"browser",
	comms: <Record<string, CommBase>>{},
	commManageras: <Record<string, CommManager>>{},
	tasks: <Record<string, Task<any>>>{},
	queues: <Record<string, SyncedQueue>>{},
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

	getSyncedQueue(queueId: string) {
		return this.queues[queueId];
	},

	createComm<T>(name: string, mergeObject: T = <T>{}): T & CommBase {
		const newCom = Object.assign<CommBase, typeof mergeObject>(
			new CommBase(name),
			mergeObject
		);
		this.comms[name] = newCom;
		return newCom;
	},

	createCommManager(data: CommManagerData) {
		const newCommManager = new CommManager(data);
		this.commManageras[data.name] = newCommManager;
		return newCommManager;
	},

	getComm(id: string) {
		return this.comms[id];
	},

	getCommManager(id: string) {
		return this.commManageras[id];
	},

	__throwError(message: string) {
		throw new Error(`[ThreadComm] ${message}`);
	},

	expectPorts(portIds: string[]) {
		if (this.__initalized) {
			return this.__throwError(
				"expectPorts must be called before initalization."
			);
		}
		for (const id of portIds) {
			this.__expectedPorts[id] = true;
		}
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
	async __handleTasksMessage(data: any[]) {
		//remove header
		data.shift();
		//remove tasks id
		const tasksId = data.shift();
		//remove queue id
		const queueId = data.shift();
		await this.tasks[tasksId].run(data);
		//complete queue
		if (queueId) {
			this.getSyncedQueue(queueId).subtractFromCount();
		}
	},
	__isTasks(data: any[]) {
		return (
			data[0] == TCMessageHeaders.runTasks && this.tasks[data[1]] !== undefined
		);
	},
	registerTasks<T>(id: string, run: (data: T) => void) {
		this.tasks[id] = new Task<T>(id, run);
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
internal[TCInternalMessages.IsReady] = (data, event) => {};
internal[TCInternalMessages.nameThread] = (data, event) => {
	const name = data[0];
	const number = data[1];
	ThreadComm.threadName = name;
	ThreadComm.threadNumber = number;
};
internal[TCInternalMessages.syncQueue] = (data, event) => {
	const queueId = data[0];
	const queueSAB = data[1];
	ThreadComm.queues[queueId] = new SyncedQueue(queueId, queueSAB);
};
internal[TCInternalMessages.unSyncQueue] = (data, event) => {
	const queueId = data[0];
	delete ThreadComm.queues[queueId];
};
