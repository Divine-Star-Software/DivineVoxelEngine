export class World {
    DVE;
    waitingForWolrdData = false;
    baseWorldData = null;
    runningBlockUpdate = false;
    worker;
    scene;
    material;
    shadowGen;
    chunkMeshes = {};
    constructor(DVE) {
        this.DVE = DVE;
    }
    reStart() {
        this.worker.postMessage("re-start");
    }
    requestWorldUpdate(type, position) {
        this.worker.postMessage([type, position.x, position.y, position.z]);
    }
    getWorker() {
        return this.worker;
    }
    startWorldGen() {
        this.worker.postMessage("start");
    }
    handleMessage(event, world) {
        const message = event.data[0];
        if (message == "remove-chunk") {
            const chunkX = event.data[1];
            const chunkZ = event.data[2];
            this.DVE.meshManager.requestChunkBeRemoved(`${chunkX}-${chunkZ}`);
        }
        if (message == "set-world-data") {
            this.baseWorldData = event.data[1];
            this.waitingForWolrdData = false;
        }
    }
    getBaseWorldData() {
        this.waitingForWolrdData = true;
        this.baseWorldData = null;
        this.worker.postMessage(["get-world-data"]);
        const world = this;
        const prom = new Promise((resolve, reject) => {
            let checkTimeout = null;
            const check = () => {
                if (world.waitingForWolrdData) {
                    checkTimeout = setTimeout(() => {
                        check();
                    }, 1);
                }
                else {
                    resolve(world.baseWorldData);
                    clearTimeout(rejectTimeout);
                    clearTimeout(checkTimeout);
                }
            };
            check();
            const rejectTimeout = setTimeout(() => {
                clearTimeout(checkTimeout);
                reject("Timed out");
            }, 60000);
        });
        return prom;
    }
    createWorldWorker(workerPath) {
        this.worker = new Worker(new URL(workerPath, import.meta.url), {
            type: "module",
        });
        this._initWorker();
    }
    setWorldWorker(worker) {
        this.worker = worker;
        this._initWorker();
    }
    _initWorker() {
        const world = this;
        this.worker.onerror = (er) => {
            console.log(er);
        };
        this.worker.onmessage = (message) => {
            this.handleMessage(message, world);
        };
    }
    _syncSettings() {
        const settings = this.DVE.engineSettings.getSettingsCopy();
        this.worker.postMessage(["sync-settings", settings]);
    }
}
