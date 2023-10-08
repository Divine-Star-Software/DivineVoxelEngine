//types
import type { CommManagerData } from "./Meta/Manager/Manager.types.js";

//classes
import { CommManager } from "./Manager/CommManager.js";
import { CommBase } from "./Comm/Comm.js";
import { SyncedQueue } from "./Queue/SyncedQueue.js";
import { TasksManager } from "./Tasks/TaskManager.js";
import { DataSyncManager } from "./Data/DataSyncManager.js";
import { InternalTasks } from "./Internal/InternalTasks.js";

export const ThreadComm = {
	threadNumber: 0,
	threadName: "unamed-threadcomm-thread",
	environment: <"node" | "browser">"browser",
	_comms: <Record<string, CommBase>>{},
	_commManageras: <Record<string, CommManager>>{},

	_queues: <Map<string, Map<string, SyncedQueue>>>new Map(),

	parent: new CommBase(""),
	internal : InternalTasks,

	__initalized: false,
	__expectedPorts: <Record<string, boolean>>{},

	crypto: <Crypto>{},

	async $INIT(threadName: string, threadParentName: string) {
		this.threadName = threadName;
		this.parent.name = threadParentName;
		const port = await this.getWorkerPort();
		this.parent.setPort(port);
		this.__initalized = true;
		this.addComm(this.parent);
		if (this.environment == "browser") {
			this.crypto = crypto;
		}
		if (this.environment == "node") {
			//@ts-ignore
			this.crypto = require("crypto");
		}
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


	async getWorkerPort() {
		if (this.environment == "browser") {
			return self;
		}
		if (this.environment == "node") {
			//@ts-ignore
			const { parentPort } = require("worker_threads");
			return parentPort;
		}
	},

	registerTasks<T>(
		id: string | number,
		run: (data: T, onDone?: (data ?: any, transfers ?: any)=>void) => void,
		mode: "async" | "deferred" = "async"
	) {
	TasksManager.registerTasks(id,run,mode);
	},


	onDataSync<T, K>(
		dataType: string | number,
		onSync?: (data: T) => void,
		onUnSync?: (data: K) => void
	) {
	  return DataSyncManager.registerDataSync(dataType,onSync,onUnSync);
	},
};
if (
	//@ts-ignore
	typeof process !== "undefined" &&
	typeof Worker === "undefined" &&
	typeof window === "undefined"
) {
	ThreadComm.environment = "node";
}



