import type { CommManager } from "../Manager/CommManager.js";
import { Queue } from "../tools/Queue.js";

export class QueueManager<T> {
	__queueData: Record<
		string | number,
		{
			queue: Queue<T>;
			map: Record<string, boolean>;
			stateSAB: SharedArrayBuffer;
			state: Uint32Array;
		}
	> = {};
	constructor(
		public id: string | number,
		public onRun: (data: T, queueId: string) => void,
		public _manager: CommManager,
		public getQueueKey: ((data: T) => string) | null = null
	) {}

	__getQueueKey(data: any) {
		if (this.getQueueKey !== null) {
			return this.getQueueKey(data);
		}
		if (Array.isArray(data)) {
			return data.toString();
		}
		if (typeof data == "object") {
			return JSON.stringify(data);
		}
		return String(data);
	}

	__getQueueData(id: string) {
		const queue = this.__queueData[id];
		if (!queue) {
			throw new Error(`Queue with id: ${id} does not exists.`);
		}
		return this.__queueData[id];
	}

	addQueue(queueId: string | number) {
		const sab = new SharedArrayBuffer(4);
		if (this.__queueData[queueId]) return false;
		this.__queueData[queueId] = {
			queue: new Queue<T>(),
			map: {},
			stateSAB: sab,
			state: new Uint32Array(sab),
		};
		const syncId = this._getSyncId(queueId);
		this._manager.__syncQueue(syncId, sab);
		return true;
	}

	_getSyncId(queueId: string | number) {
		return `${this.id}-${queueId}`;
	}

	removeQueue(queueId: string | number) {
		if (!this.__queueData[queueId]) return false;
		delete this.__queueData[queueId];
		const syncId = this._getSyncId(queueId);
		this._manager.__unSyncQueue(syncId);
		return true;
	}

	add(data: T, queueId = "main") {
		const queueData = this.__getQueueData(queueId);
		const queueKey = this.__getQueueKey(data);
		if (queueData.map[queueKey]) return;
		queueData.map[queueKey] = true;
		queueData.queue.enqueue(data);
	}

	run(queueId = "main", filter?: (data: T) => 0 | 1 | 2) {
		const reQueue = new Queue<T>();
		const newMap: Record<string, boolean> = {};
		const queueData = this.__getQueueData(queueId);
		const queue = queueData.queue;
		const state = queueData.state;
		const syncId = this._getSyncId(queueId);
		while (true) {
			const data = queue.dequeue();
			if (!data) break;
			if (filter) {
				const filterReturn = filter(data);
				if (filterReturn == 0) continue;
				if (filterReturn == 1) {
					newMap[this.__getQueueKey(data)] = true;
					reQueue.enqueue(data);
					continue;
				}
			}
			Atomics.add(state, 0, 1);
			this.onRun(data, syncId);
		}
		this.__queueData[queueId].map = {};
		if (filter) {
			this.__queueData[queueId].queue = queue;
			this.__queueData[queueId].map = newMap;
		}
	}

	runAndAwait(queueId = "main", filter?: (data: T) => 0 | 1 | 2) {
		this.run(queueId, filter);
		return this.awaitAll(queueId);
	}

	awaitAll(queueId: string = "main") {
		const queueData = this.__getQueueData(queueId);
		return new Promise<boolean>((resolve, reject) => {
			const inte = setInterval(() => {
				if (Atomics.load(queueData.state, 0) == 0) {
					clearInterval(inte);
					resolve(true);
				}
			}, 1);
		});
	}

	onDone(queueId: string = "main", run: Function) {
		const queueData = this.__getQueueData(queueId);
		const inte = setInterval(() => {
			if (Atomics.load(queueData.state, 0) == 0) {
				clearInterval(inte);
				run();
			}
		}, 1);
	}

	isDone(queueId: string = "main") {
		const queueData = this.__getQueueData(queueId);
		return Atomics.load(queueData.state, 0) == 0;
	}
}
