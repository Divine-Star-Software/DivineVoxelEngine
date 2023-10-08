import { TCInternalMessages, TCMessageHeaders } from "./Messages.js";
import type { MessageFunction } from "../Meta/Util.types.js";
import { ThreadComm } from "../ThreadComm.js";
import { PromiseTasks } from "../Tasks/PromiseTasks.js";
import { SyncedQueue } from "../Queue/SyncedQueue.js";
import { TasksManager } from "../Tasks/TaskManager.js";
import { DataSyncManager } from "../Data/DataSyncManager.js";
export const InternalTasks = {
	_tasks: new Map<number, Map<number, MessageFunction>>(),

	registerTasks(headID: number, taskId: number, run: MessageFunction) {
		let map = this._tasks.get(headID);
		if (!map) {
			map = new Map();
			this._tasks.set(headID, map);
		}
        map.set(taskId, run);
	},

	isInternal(data: any) {
		const headerId = data[0];
		const tasksId = data[1];
		if (typeof headerId !== "number" || typeof tasksId !== "number")
			return false;
		const map = this._tasks.get(headerId);
		if (!map) return false;
		const tasks = map.get(tasksId);
		if (!tasks) return false;
		return true;
	},

	runInternal(data: any,event : any) {
		const headerId = data[0];
		const tasksId = data[1];
		const map = this._tasks.get(headerId);
		if (!map) return false;
		const tasks = map.get(tasksId);
		if (!tasks) return false;
		data.shift();
		data.shift();
		tasks(data,event);
	},
};

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.connectPort,
	(data, event) => {
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
	}
);
InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.IsReady,
	(data, event) => {
		const name = data[0];
		const comm = ThreadComm.getComm(name);
		if (!comm) return;
		comm.__ready = true;
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.nameThread,
	(data, event) => {
		const name = data[0];
		const number = data[1];
		ThreadComm.threadName = name;
		ThreadComm.threadNumber = number;
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.syncQueue,
	(data, event) => {
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
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.unSyncQueue,
	(data, event) => {
		const threadName = data[0];
		const queueId = data[1];
		if (!ThreadComm._queues.has(threadName)) {
			return;
		}
		//@ts-ignore
		ThreadComm._queues.get(threadName).delete(queueId);
	}
);
InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.completeTasks,
	(data, event) => {
		const tasksId = data[0];
		const requestsId = data[1];
		const tasksData = data[2];
		PromiseTasks.completePromiseTasks(tasksId, requestsId, tasksData);
	}
);
InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.checkTasksResult,
	(data, event) => {
		const result = data[0];
		const promiseId = data[1];

		PromiseTasks.completePromiseTasks("tasks-check", promiseId, result);
	}
);

const __handleTasksDone = (
	tasksId: string,
	mode: number,
	threadId: string,
	tid: string,
	tasksData: any,
	transfers: any
) => {
	if (mode == 1) {
		const comm = ThreadComm.getComm(threadId);
		comm.sendMessage(
			TCMessageHeaders.internal,
			[TCInternalMessages.completeTasks, tasksId, tid, tasksData],
			transfers
		);
	}
	if (mode == 2) {
		//complete queue
		if (tid && threadId) {
			const queue = ThreadComm.getSyncedQueue(threadId, tid);
			if (queue) {
				queue.subtractFromCount();
			}
		}
	}
};
InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.runTasks,
	async (data, event) => {
		//remove tasks id
		const tasksId = data.shift();
		//remove thread id
		const threadId = data.shift();
		//remove queue id
		const mode = data.shift();
		//remove queue id
		const tid = data.shift();

		const takss = TasksManager.getTasks(tasksId);
		if (!takss) return;

		if (takss.mode == "async") {
			const tasksData = await takss.run(data[0]);
			__handleTasksDone(tasksId, mode, threadId, tid, tasksData, []);
		}
		if (takss.mode == "deferred") {
			await takss.run(data[0], (tasksData: any, transfers: any) => {
				__handleTasksDone(tasksId, mode, threadId, tid, tasksData, transfers);
			});
		}
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.checkTasks,
	async (data, event) => {
		//remove tasks id
		const tasksId = data.shift();
		//remove thread id
		const threadId = data.shift();
		//remove promise id
		const promiseId = data.shift();

		const thread = ThreadComm.getComm(threadId);
		const takss = TasksManager.getTasks(tasksId);
		if (!takss) return;

		if (takss && thread) {
			thread.sendMessage(TCMessageHeaders.internal, [
				TCInternalMessages.checkTasksResult,
				true,
				promiseId,
			]);
		}
		if (!takss && thread) {
			thread.sendMessage(TCMessageHeaders.internal, [
				TCInternalMessages.checkTasksResult,
				false,
				promiseId,
			]);
		}
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.SyncData,
	async (data, event) => {
		//remove tasks id
		const dataTypeId = data.shift();
		const dataSync = DataSyncManager.getDataSync(dataTypeId);
		if (!dataSync) return false;
		const syncData = data.shift();
		dataSync.sync(syncData);
	}
);

InternalTasks.registerTasks(
	TCMessageHeaders.internal,
	TCInternalMessages.UnSyncData,
	async (data, event) => {
		//remove tasks id
		const dataTypeId = data.shift();
		const dataSync = DataSyncManager.getDataSync(dataTypeId);
		if (!dataSync) return false;
		const unSyncData = data.shift();
		dataSync.unSync(unSyncData);
	}
);


