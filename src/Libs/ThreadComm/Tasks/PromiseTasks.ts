export const PromiseTasks = {
	_waiting: <Map<string | number, Map<string | number, (data: any) => void>>>(
		new Map()
	),

	addPromiseTakss(
		tasksId: string | number,
		tasksRequestsId: string | number,
		onDone: (data: any) => void
	) {
		let requestsMap = this._waiting.get(tasksId);
		if (!requestsMap) {
			requestsMap = new Map();
			this._waiting.set(tasksId, requestsMap);
		}
		requestsMap.set(tasksRequestsId, onDone);
	},

	completePromiseTasks(
		tasksId: string | number,
		tasksRequestsId: string | number,
		data: any
	) {
		let requestsMap = this._waiting.get(tasksId);
		if (!requestsMap) return;
		const run = requestsMap.get(tasksRequestsId);
		if (!run) return;
		run(data);
	},
};
