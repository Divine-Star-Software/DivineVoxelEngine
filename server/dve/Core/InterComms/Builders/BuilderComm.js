/**# Builder Comm
 * ---
 * Handles communcation with the builder threads and the fluid builder thread.
 * Sends the mesh data from them to the mesh manager.
 */
export class BuilderComm {
    DVE;
    numBuilders = 4;
    count = 0;
    builders = [];
    fluidBuilder;
    buildRequestFunctions = {
        //chunk meshes
        0: (chunkKey, chunkX, chunkY, chunkZ, data) => {
            this.DVER.meshManager.handleUpdate("solid", chunkKey, chunkX, chunkY, chunkZ, data);
        },
        1: (chunkKey, chunkX, chunkY, chunkZ, data) => {
            this.DVER.meshManager.handleUpdate("flora", chunkKey, chunkX, chunkY, chunkZ, data);
        },
        3: (chunkKey, chunkX, chunkY, chunkZ, data) => {
            this.DVER.meshManager.handleUpdate("magma", chunkKey, chunkX, chunkY, chunkZ, data);
        },
    };
    constructor(DVE) {
        this.DVE = DVE;
        const numBuilders = 4;
        /*   if (window.navigator.hardwareConcurrency > numBuilders) {
         //use all possible cores if we can
         this.numBuilders = window.navigator.hardwareConcurrency;
        } */
    }
    reStart() {
        for (const worker of this.builders) {
            worker.postMessage(["re-start"]);
        }
        this.fluidBuilder.postMessage(["re-start"]);
    }
    setBuilderWorkers(workers) {
        this.builders = workers;
        this.numBuilders = workers.length;
        this._initBuilderWorkers();
    }
    createBuilderWorkers(path) {
        //  "../Contexts/MeshBuilders/ChunkMeshBuilder.worker.js",
        for (let i = 0; i < this.numBuilders; i++) {
            this.builders[i] = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
        }
        this._initBuilderWorkers();
    }
    _initBuilderWorkers() {
        for (let i = 0; i < this.numBuilders; i++) {
            this.builders[i].onerror = (er) => {
                console.log(er);
            };
            this.builders[i].onmessage = async (event) => {
                this._handleBuildMeshMessage(event);
            };
            const channel = new MessageChannel();
            const worldWorker = this.DVER.worldComm.getWorker();
            const builderWorker = this.builders[i];
            //connect builder to world
            worldWorker.postMessage(["connect-builder"], [channel.port1]);
            //connect world to builder
            builderWorker.postMessage(["connect-world"], [channel.port2]);
        }
    }
    createFluidBuilderWorker(path) {
        this.fluidBuilder = new Worker(new URL(path, import.meta.url), {
            type: "module",
        });
        this._initFluidBuilder();
    }
    setFluidBuilderWorker(worker) {
        this.fluidBuilder = worker;
        this._initFluidBuilder();
    }
    _initFluidBuilder() {
        this.fluidBuilder.onerror = (er) => {
            console.log(er);
        };
        this.fluidBuilder.onmessage = async (event) => {
            this._handlFluideBuildMeshMessage(event);
        };
        const channel = new MessageChannel();
        const worldWorker = this.DVER.worldComm.getWorker();
        //connect world to fluid builder
        worldWorker.postMessage(["connect-fluid-builder"], [channel.port1]);
        //connect fluid builder to world
        this.fluidBuilder.postMessage(["connect-world"], [channel.port2]);
    }
    async _handlFluideBuildMeshMessage(event) {
        const meshType = event.data[0];
        const chunkX = event.data[1];
        const chunkY = event.data[2];
        const chunkZ = event.data[3];
        const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;
        this.DVER.meshManager.handleUpdate("fluid", chunkKey, chunkX, chunkY, chunkZ, event.data);
    }
    async _handleBuildMeshMessage(event) {
        const meshType = event.data[0];
        const chunkX = event.data[1];
        const chunkY = event.data[2];
        const chunkZ = event.data[3];
        const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;
        this.buildRequestFunctions[meshType](chunkKey, chunkX, chunkY, chunkZ, event.data);
    }
    _syncSettings() {
        const settings = this.DVER.engineSettings.getSettingsCopy();
        for (const builders of this.builders) {
            builders.postMessage(["sync-settings", settings]);
        }
        this.fluidBuilder.postMessage(["sync-settings", settings]);
    }
}
