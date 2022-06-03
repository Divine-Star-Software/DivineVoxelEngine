export function InitWorkers(DVER, initData) {
    DVER.settings.syncSettings(initData);
    DVER._handleOptions();
    if (typeof initData.worldWorker == "string") {
        const worker = DVER.__createWorker(initData.worldWorker);
        DVER.worldComm.setPort(worker);
    }
    else if (initData.worldWorker instanceof Worker) {
        DVER.worldComm.setPort(initData.worldWorker);
    }
    else {
        throw Error("Supplied data for World Worker is not correct. Must be path to worker or a worker.");
    }
    if (typeof initData.builderWorker == "string") {
        DVER.builderCommManager.createBuilders(initData.builderWorker);
    }
    else if (Array.isArray(initData.builderWorker) &&
        initData.builderWorker[0] instanceof Worker) {
        DVER.builderCommManager.setBuilders(initData.builderWorker);
    }
    else {
        throw Error("Supplied data for the Builder Workers is not correct. Must be path to worker or an array workers.");
    }
    if (typeof initData.propagationWorker == "string") {
        DVER.propagationCommManager.createPropagators(initData.propagationWorker);
    }
    else if (Array.isArray(initData.propagationWorker) &&
        initData.propagationWorker[0] instanceof Worker) {
        DVER.propagationCommManager.setPropagators(initData.propagationWorker);
    }
    else {
        throw Error("Supplied data for the World Generation Workers is not correct. Must be path to worker or an array workers.");
    }
    if (initData.nexusWorker && initData.nexus?.enabled) {
        if (typeof initData.nexusWorker == "string") {
            const worker = DVER.__createWorker(initData.nexusWorker);
            DVER.nexusComm.setPort(worker);
        }
        else if (initData.nexusWorker instanceof Worker) {
            DVER.nexusComm.setPort(initData.nexusWorker);
        }
        else {
            throw Error("Supplied data for Nexus Worker is not correct. Must be path to worker or a worker.");
        }
        DVER.nexusComm.$INIT();
    }
    DVER._syncSettings(initData);
    DVER.textureManager.generateTexturesData();
    DVER.builderCommManager.$INIT();
    DVER.propagationCommManager.$INIT();
    //terminate all workers
    window.addEventListener("beforeunload", () => {
        for (const builder of DVER.builderCommManager.builders) {
            //@ts-ignore
            builder.port.terminate();
        }
        //@ts-ignore
        DVER.worldComm.port.terminate();
        if (DVER.nexusComm.port) {
            //@ts-ignore
            DVER.nexusComm.port.terminate();
        }
    });
}
