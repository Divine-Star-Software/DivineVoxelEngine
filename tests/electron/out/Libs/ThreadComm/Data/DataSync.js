export class DataSync {
    __onSyncFunctions = [];
    __onUnSyncFunctions = [];
    constructor() { }
    addOnSync(func) {
        this.__onSyncFunctions.push(func);
    }
    addOnUnSync(func) {
        this.__onUnSyncFunctions.push(func);
    }
    sync(data) {
        for (const func of this.__onSyncFunctions) {
            func(data);
        }
    }
    unSync(data) {
        for (const func of this.__onUnSyncFunctions) {
            func(data);
        }
    }
}
