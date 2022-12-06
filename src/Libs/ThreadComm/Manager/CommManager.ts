//types
import type { CommPortTypes } from "../Meta/Comm/Comm.types";
import type { MessageFunction, MessageRecord } from "../Meta/Util.types.js";
import type { CommManagerData } from "../Meta/Manager/Manager.types.js";
//constants
import { TCMessageHeaders, TCInternalMessages } from "../Constants/Messages.js";
//classes
import { CommBase } from "../Comm/Comm.js";
import { QueueManager } from "../Queue/QueueManager.js";
import { ThreadComm } from "../ThreadComm.js";

export class CommManager {
	_totalComms = 0;
	_currentCom = 0;
	name = "";
	__comms: CommBase[] = [];
	__data: CommManagerData = {
		name: "",
		onPortSet: (port, commName) => {},
	};
	__queues: Record<string, QueueManager<any>> = {};
	messageFunctions: MessageRecord = {};

	constructor(data: CommManagerData) {
		this.__data = data;
		this.name = data.name;
	}

	__throwError(message: string) {
		throw new Error(`[ThreadCommManager : ${this.__data.name}] ${message}`);
	}

	connectToCom(commToConnectTo: CommBase) {
		for (const comm of this.__comms) {
			comm.connectToComm(commToConnectTo);
		}
	}

	destroyAll() {
		for (const comm of this.__comms) {
			comm.destroy();
		}
	}

	isReady() {
		let ready = true;
		for (const comm of this.__comms) {
			if (!comm.isReady()) ready = false;
		}
		return ready;
	}

	waitTillAllAreReady() {
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

	addPort(port: CommPortTypes) {
		this._totalComms++;
		const newCommName = `${this.__data.name}-${this._totalComms}`;
		const newComm = new CommBase(newCommName, this.__data.name, this);
		ThreadComm.addComm(newComm);
		newComm.setPort(port);
		this.__data.onPortSet(port, newCommName);

		this.__comms.push(newComm);
		newComm.sendMessage(TCMessageHeaders.internal, [
			TCInternalMessages.nameThread,
			newCommName,
			this._totalComms,
		]);
	}
	addPorts(ports: CommPortTypes[]) {
		for (const port of ports) {
			this.addPort(port);
		}
	}
	addComms(comms: CommBase[]) {
		this._totalComms += comms.length;
		this.__comms.push(...comms);
	}

	__isManagerMessage(data: any) {
		return this.messageFunctions[data[0]] !== undefined;
	}

	__handleManagerMessage(data: any, event: any) {
		if (!this.messageFunctions[data[0]]) return;
		this.messageFunctions[data[0]].forEach((_) => _(data, event));
	}

	listenForMessage(message: string | number, run: MessageFunction) {
		this.messageFunctions[message] ??= [];
		this.messageFunctions[message].push(run);
	}

	sendMessageToAll(
		message: string | number,
		data: any[] = [],
		transfers?: any[]
	) {
		for (const comm of this.__comms) {
			comm.sendMessage(message, data, transfers);
		}
	}

	runTasksForAll<T>(
		id: string,
		data: T,
		transfers: any[] = [],
		queueId?: string
	) {
		for (const comm of this.__comms) {
			comm.runTasks(id, data, transfers, queueId);
		}
	}

	runTask<T>(
		id: string | number,
		data: T,
		transfers: any[] = [],
		threadNumber = -1,
		queueId?: string
	) {
		if (threadNumber < 0) {
			const comm = this.__comms[this._currentCom];
			comm.runTasks(id, data, transfers, queueId);
			return this.__handleCount();
		} else {
			const comm = this.__comms[threadNumber];
			comm.runTasks(id, data, transfers, queueId);
			return threadNumber;
		}
	}

	runPromiseTasks<T>(
		id: string | number,
		requestsID: string,
		onDone: (data: any) => void,
		data: T,
		transfers: any[] = [],
		threadNumber = -1
	) {
		if (threadNumber < 0) {
			const comm = this.__comms[this._currentCom];
			comm.runPromiseTasks(id, requestsID, onDone, data, transfers);
			return this.__handleCount();
		} else {
			const comm = this.__comms[threadNumber];
			comm.runPromiseTasks(id, requestsID, onDone, data, transfers);
			return threadNumber;
		}
	}

	__handleCount() {
		let countReturn = this._currentCom;
		this._currentCom++;
		if (this._currentCom >= this._totalComms) {
			this._currentCom = 0;
		}
		return countReturn;
	}

	addQueue<T>(
		id: string | number,
		associatedTasksId: string | number,
		getQueueKey: ((data: T) => string) | null = null,
		beforeRun: (data: T) => T = (data: T) => data,
		afterRun: (data: T, thread: number) => void = (
			data: T,
			thread: number
		) => {},
		getThread: (data: T) => number = (data: T) => -1,
		getTransfers: (data: T) => any[] = (data) => []
	) {
		if (this.__queues[id]) {
			this.__throwError(`Queue with ${id} already exists.`);
		}
		const newQueue = new QueueManager<T>(
			id,
			(data, queueId) => {
				data = beforeRun(data);
				const thread = this.runTask(
					associatedTasksId,
					data,
					getTransfers(data),
					getThread(data),
					queueId
				);
				afterRun(data, thread);
			},
			this,
			getQueueKey
		);
		this.__queues[id] = newQueue;
		return newQueue;
	}

	getQueue<T>(id: string | number) {
		const queue = this.__queues[id];
		if (!queue) {
			this.__throwError(`Queue with ${id} does not exists.`);
		}
		return <QueueManager<T>>queue;
	}

	__syncQueue(id: string | number, sab: SharedArrayBuffer) {
		for (const comm of this.__comms) {
			comm.__syncQueue(id, sab);
		}
	}

	__unSyncQueue(id: string | number) {
		for (const comm of this.__comms) {
			comm.__unSyqncQueue(id);
		}
	}

	syncData<T>(dataType: string | number, data: T) {
		for (const comm of this.__comms) {
			comm.syncData(dataType, data);
		}
	}

	unSyncData<T>(dataType: string | number, data: T) {
		for (const comm of this.__comms) {
			comm.unSyncData(dataType, data);
		}
	}
}
