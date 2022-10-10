//types
import type { CommPortTypes } from "../Meta/Comm/Comm.types";
import type { MessageFunction, MessageRecord } from "../Meta/Util.types.js";
import type { CommManagerData } from "../Meta/Manager/Manager.types.js";
//constants
import { TCMessageHeaders, TCInternalMessages } from "../Constants/Messages.js";
//classes
import { CommBase } from "../Comm/Comm.js";
import { QueueManager } from "../Queue/QueueManager.js";

export class CommManager {
	_totalComms = 0;
	_currentCom = 0;
	__comms: CommBase[] = [];
	__data: CommManagerData = {
		name: "",
		onPortSet: (port, commName) => {},
	};
	__queues: Record<string, QueueManager<any>> = {};
	messageFunctions: MessageRecord = {};

	constructor(data: CommManagerData) {
		this.__data = data;
	}

	__throwError(message: string) {
		throw new Error(`[ThreadCommManager : ${this.__data.name}] ${message}`);
	}
	connectToCom(commToConnectTo: CommBase) {
		for (const comm of this.__comms) {
			comm.connectToComm(commToConnectTo);
		}
	}
	isReady() {
		let ready = true;
		for (const comm of this.__comms) {
			if (!comm.isReady()) ready = false;
		}
		return ready;
	}

	addPort(port: CommPortTypes) {
		this._totalComms++;
		const newCommName = `${this.__data.name}-${this._totalComms}`;
		const newComm = new CommBase(newCommName, this.__data.name, this);
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
		this.messageFunctions[data[0]](data, event);
	}

	listenForMessage(message: string | number, run: MessageFunction) {
		this.messageFunctions[message] = run;
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

	runTasksForAll<T>(id: string, data: T, queue?: string) {
		for (const comm of this.__comms) {
			comm.runTasks(id, data, queue);
		}
	}

	runTask<T>(id: string, data: T, queue?: string) {
		const comm = this.__comms[this._currentCom];
		comm.runTasks(id, data, queue);
		return this.__handleCount();
	}

	__handleCount() {
		let countReturn = this._currentCom;
		this._currentCom++;
		if (this._currentCom >= this._totalComms) {
			this._currentCom = 0;
		}
		return countReturn;
	}

	addQueue<T>(id: string, associatedTasksId: string) {
		if (this.__queues[id]) {
			this.__throwError(`Queue with ${id} already exists.`);
		}
		const newQueue = new QueueManager<T>(
			id,
			(data, queueId) => {
				this.runTask(associatedTasksId, data, queueId);
			},
			this
		);
		this.__queues[id] = newQueue;
		return newQueue;
	}

	getQueue<T>(id: string) {
		const queue = this.__queues[id];
		if (!queue) {
			this.__throwError(`Queue with ${id} does not exists.`);
		}
		return <QueueManager<T>>queue;
	}

	__syncQueue(id: string, sab: SharedArrayBuffer) {
		for (const comm of this.__comms) {
			comm.__syncQueue(id, sab);
		}
	}

	__unSyncQueue(id: string) {
		for (const comm of this.__comms) {
			comm.__unSyqncQueue(id);
		}
	}
}
