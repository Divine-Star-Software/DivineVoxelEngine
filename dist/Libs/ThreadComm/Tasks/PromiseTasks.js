export const PromiseTasks = {
    _waiting: (new Map()),
    addPromiseTakss(tasksId, tasksRequestsId, onDone) {
        let requestsMap = this._waiting.get(tasksId);
        if (!requestsMap) {
            requestsMap = new Map();
            this._waiting.set(tasksId, requestsMap);
        }
        requestsMap.set(tasksRequestsId, onDone);
    },
    completePromiseTasks(tasksId, tasksRequestsId, data) {
        let requestsMap = this._waiting.get(tasksId);
        if (!requestsMap)
            return;
        const run = requestsMap.get(tasksRequestsId);
        if (!run)
            return;
        run(data);
    },
};
