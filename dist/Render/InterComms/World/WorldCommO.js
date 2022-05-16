/**# World Comm
 * ---
 * Handles communication with the world thread.
 */
export class WorldComm {
    DVER;
    worker;
    constructor(DVER) {
        this.DVER = DVER;
    }
    getWorker() {
        return this.worker;
    }
    start() {
        this.worker.postMessage(["start"]);
    }
    reStart() {
        this.worker.postMessage(["re-start"]);
    }
    handleMessage(event, world) {
        const message = event.data[0];
        if (message == "remove-chunk") {
            const chunkX = event.data[1];
            const chunkZ = event.data[2];
            this.DVER.meshManager.requestChunkBeRemoved(`${chunkX}-${chunkZ}`);
        }
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
        const settings = this.DVER.engineSettings.getSettingsCopy();
        this.worker.postMessage(["sync-settings", settings]);
    }
}
