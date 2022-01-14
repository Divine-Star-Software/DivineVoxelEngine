export class BuilderManager {
    DVE;
    numBuilders = 4;
    count = 0;
    builders = [];
    buildRequestFunctions = {
        //chunk meshes
        0: (chunkKey, chunkX, chunkZ, data) => {
            this.DVE.meshManager.handleUpdate("solid", chunkKey, chunkX, chunkZ, data);
        },
        1: (chunkKey, chunkX, chunkZ, data) => {
            this.DVE.meshManager.handleUpdate("flora", chunkKey, chunkX, chunkZ, data);
        },
        2: (chunkKey, chunkX, chunkZ, data) => {
            this.DVE.meshManager.handleUpdate("fluid", chunkKey, chunkX, chunkZ, data);
        },
        3: (chunkKey, chunkX, chunkZ, data) => {
            this.DVE.meshManager.handleUpdate("magma", chunkKey, chunkX, chunkZ, data);
        },
    };
    constructor(DVE) {
        this.DVE = DVE;
        /*     const numBuilders = 4;
      
          if(window.navigator.hardwareConcurrency > numBuilders) {
            //use all possible cores if we can
            this.numBuilders = window.navigator.hardwareConcurrency * 2
            ;
          }]
           */
    }
    createBuilderWorker(path) {
        //  "../Contexts/MeshBuilders/ChunkMeshBuilder.worker.js",
        for (let i = 0; i < this.numBuilders; i++) {
            this.builders[i] = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
            this.builders[i].onerror = (er) => {
                console.log(er);
            };
            this.builders[i].onmessage = async (event) => {
                this._handleBuildMeshMessage(event);
            };
            const channel = new MessageChannel();
            const worldWorker = this.DVE.world.getWorker();
            const builderWorker = this.builders[i];
            // Setup the connection: Port 1 is for worker 1
            worldWorker.postMessage(["connect-builder"], [channel.port1]);
            // Setup the connection: Port 2 is for worker 2
            builderWorker.postMessage(["connect-world"], [channel.port2]);
        }
    }
    async _handleBuildMeshMessage(event) {
        const meshType = event.data[0];
        const chunkX = event.data[1];
        const chunkZ = event.data[2];
        const chunkKey = `${chunkX}-${chunkZ}`;
        this.buildRequestFunctions[meshType](chunkKey, chunkX, chunkZ, event.data);
    }
}
