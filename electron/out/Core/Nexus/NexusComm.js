/**# NexusComm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
    DVE;
    worker;
    scene;
    messageFunctions = {
        "spawn-entity": (data, event) => {
            const entityId = data[1];
            const identiferId = data[2];
            const position = data[3];
            const states = data[4];
            this.DVE.renderedEntites.spawnEntity(entityId, identiferId, position, states);
        },
        "de-spawn-entity": (data, event) => {
            const entityId = data[1];
            const identiferId = data[2];
            this.DVE.renderedEntites.deSpawnEntity(entityId, identiferId);
        },
    };
    constructor(DVE) {
        this.DVE = DVE;
    }
    reStart() {
        this.worker.postMessage("re-start");
    }
    getWorker() {
        return this.worker;
    }
    startWorldGen() {
        this.worker.postMessage("start");
    }
    handleMessage(event) {
        console.log(event);
        const message = event.data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message](event.data, event);
        }
    }
    createNexusWorker(workerPath) {
        this.worker = new Worker(new URL(workerPath, import.meta.url), {
            type: "module",
        });
        this._initWorker();
    }
    setNexusWorker(worker) {
        this.worker = worker;
        this._initWorker();
    }
    _initWorker() {
        const world = this;
        this.worker.onerror = (er) => {
            console.log(er);
        };
        this.worker.onmessage = (message) => {
            this.handleMessage(message);
        };
        const channel = new MessageChannel();
        const worldWorker = this.DVE.worldComm.getWorker();
        //connect world to fluid builder
        worldWorker.postMessage(["connect-nexus"], [channel.port1]);
        //connect fluid builder to world
        this.worker.postMessage(["connect-world"], [channel.port2]);
    }
    _syncSettings() {
        this.worker.postMessage(["sync-settings", this.DVE.engineSettings.settings]);
    }
}
