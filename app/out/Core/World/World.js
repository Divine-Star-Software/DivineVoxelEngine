import { ChunkMesh } from "../Render/Meshes/Chunk/ChunkMesh.js";
export class World {
    DS;
    waitingForWolrdData = false;
    baseWorldData = null;
    runningBlockUpdate = false;
    worker;
    chunkBuilder = new ChunkMesh();
    scene;
    material;
    shadowGen;
    chunkMeshes = {};
    constructor(DS) {
        this.DS = DS;
    }
    requestWorldUpdate(type, position) {
        this.DS.builderManager.runningBlockUpdate = true;
        this.worker.postMessage([type, position.x, position.y, position.z]);
        setTimeout(() => {
            if (this.DS.builderManager.runningBlockUpdate) {
                this.DS.builderManager.runningBlockUpdate = false;
            }
        }, 10);
    }
    setShadowGen(shadowGen) {
        this.shadowGen = shadowGen;
    }
    getChunkMeshFacetData(chunkX, chunkZ, faceID) {
        if (!this.chunkMeshes[chunkX])
            return false;
        if (this.chunkMeshes[chunkX][chunkZ]) {
            return this.chunkMeshes[chunkX][chunkZ].getFacetLocalPositions()[faceID];
        }
        else {
            return false;
        }
    }
    getChunkMesh(chunkX, chunkZ) {
        if (!this.chunkMeshes[chunkX])
            return false;
        if (this.chunkMeshes[chunkX][chunkZ]) {
            return this.chunkMeshes[chunkX][chunkZ];
        }
        else {
            return false;
        }
    }
    setScene(scene) {
        this.scene = scene;
    }
    setMaterial(material) {
        this.material = material;
    }
    getWorker() {
        return this.worker;
    }
    sendPlayerSharedArrays(arrays) {
        this.worker.postMessage(["connect-player", arrays[0], arrays[1], arrays[2]]);
    }
    startWorldGen() {
        this.worker.postMessage("start");
    }
    handleMessage(event, world) {
        const message = event.data[0];
        if (message == "remove-chunk") {
            const chunkX = event.data[1];
            const chunkZ = event.data[2];
            this.DS.builderManager.requestChunkBeRemoved(chunkX, chunkZ);
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
}
