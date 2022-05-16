/**# NexusComm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
    DVER;
    worker;
    scene;
    messageFunctions = {
        "spawn-entity": (data, event) => {
            const entityId = data[1];
            const identiferId = data[2];
            const position = data[3];
            const states = data[4];
            this.DVER.renderedEntites.spawnEntity(entityId, identiferId, position, states);
        },
        "de-spawn-entity": (data, event) => {
            const entityId = data[1];
            const identiferId = data[2];
            this.DVER.renderedEntites.deSpawnEntity(entityId, identiferId);
        },
    };
    constructor(DVER) {
        this.DVER = DVER;
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
        const message = event.data[0];
        console.log(message);
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
        this.worker.onerror = (er) => {
            console.log(er);
        };
        this.worker.onmessage = (event) => {
            this.handleMessage(event);
        };
        const channel = new MessageChannel();
        //connect builder to world
        this.DVER.worldComm.sendMessage("connect-nexus", [], [channel.port1]);
        //connect fluid builder to world
        this.worker.postMessage(["connect-world"], [channel.port2]);
    }
    _syncSettings() {
        this.worker.postMessage(["sync-settings", this.DVER.engineSettings.settings]);
    }
}
