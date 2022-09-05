export function InitWorkers(DVES, initData) {
    DVES.settings.syncSettings(initData);
    if (typeof initData.worldWorker == "string") {
        const worker = DVES.__createWorker(initData.worldWorker);
        DVES.worldComm.setPort(worker);
    }
    else if (typeof initData.worldWorker == "object") {
        DVES.worldComm.setPort(initData.worldWorker);
    }
    else {
        throw Error("Supplied data for World Worker is not correct. Must be path to worker or a worker.");
    }
    if (typeof initData.constructorWorker == "string") {
        DVES.constructorCommManager.createConstructors(initData.constructorWorker);
    }
    else if (Array.isArray(initData.constructorWorker) &&
        typeof initData.constructorWorker[0] == "object") {
        DVES.constructorCommManager.setConstructors(initData.constructorWorker);
    }
    else {
        throw Error("Supplied data for the Constructor Workers is not correct. Must be path to worker or an array workers.");
    }
    DVES.syncSettingsWithWorkers(initData);
    DVES.constructorCommManager.$INIT();
    DVES.worldComm.sendMessage("start", []);
}
