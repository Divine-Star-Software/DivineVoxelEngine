export class AsyncHook {
    _onRun = [];
    async run(data) {
        let returnData = false;
        for (const run of this._onRun) {
            returnData = await run(data);
        }
        return returnData;
    }
    addToRun(run) {
        this._onRun.push(run);
    }
}
export class SyncHook {
    _onRun = [];
    run(data) {
        let returnData = false;
        for (const run of this._onRun) {
            returnData = run(data);
        }
        return returnData;
    }
    addToRun(run) {
        this._onRun.push(run);
    }
}
