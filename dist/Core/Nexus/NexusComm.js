/**# NexusComm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
    DVE;
    worker;
    scene;
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
    handleMessage(event, world) {
        const message = event.data[0];
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
            this.handleMessage(message, world);
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
