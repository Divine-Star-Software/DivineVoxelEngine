/**# Nexus
 * ---
 * Handles communication with the DVEN thread.
 */
export class Nexus {
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
        //../Contexts/World/World.worker.js
        const world = this;
        this.worker = new Worker(new URL(workerPath, import.meta.url), {
            type: "module",
        });
        this.worker.onerror = (er) => {
            console.log(er);
        };
        this.worker.onmessage = (message) => {
            this.handleMessage(message, world);
        };
    }
    _syncSettings() {
        this.worker.postMessage(["sync-settings", this.DVE.engineSettings.settings]);
    }
}
