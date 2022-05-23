//comms
import { GetNewPropagationComm } from "./PropagationComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export const PropagationCommManager = {
    count: 0,
    numWorldGens: 0,
    states: new Int32Array(),
    __numLightUpdates: 0,
    propagators: [],
    worldGensConnected: 0,
    $INIT() {
        const sab = new SharedArrayBuffer(4 * 4);
        PropagationCommManager.states = new Int32Array(sab);
        for (const propagators of this.propagators) {
            propagators.sendMessage(-1, [sab]);
        }
    },
    addPropagator(port) {
        const newComm = GetNewPropagationComm(this.numWorldGens + 1, port);
        this.propagators.push(newComm);
    },
    syncChunkInAllWorldGens(chunkX, chunkY, chunkZ) {
        for (const worldGen of this.propagators) {
            DVEW.matrixCentralHub.syncChunkInThread(worldGen.name, chunkX, chunkY, chunkZ);
        }
    },
    releaseChunkInAllWorldGens(chunkX, chunkY, chunkZ) {
        for (const worldGen of this.propagators) {
            DVEW.matrixCentralHub.releaseChunkInThread(worldGen.name, chunkX, chunkY, chunkZ);
        }
    },
    syncRegionInAllWorldGens(regionX, regionY, regionZ) {
        for (const worldGen of this.propagators) {
            DVEW.matrixCentralHub.syncRegionInThread(worldGen.name, regionX, regionY, regionZ);
        }
    },
    releaseRegionInAllWorldGens(regionX, regionY, regionZ) {
        for (const worldGen of this.propagators) {
            DVEW.matrixCentralHub.releaseRegionInThread(worldGen.name, regionX, regionY, regionZ);
        }
    },
    isReady() {
        if (!this.worldGensConnected)
            return false;
        if (this.worldGensConnected < this.numWorldGens)
            return false;
        return true;
    },
    _chunkRebuildQueMap: {},
    _chunkRebuildQue: [],
    __addToRebuildQue(x, y, z, substance) {
        const chunk = DVEW.worldData.getChunk(x, y, z);
        if (!chunk)
            return;
        const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = DVEW.worldBounds.getChunkKey(chunkPOS);
        if (!this._chunkRebuildQueMap[chunkKey]) {
            this._chunkRebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
            //@ts-ignore
            this._chunkRebuildQueMap[chunkKey] = {};
            this._chunkRebuildQueMap[chunkKey][substance] = true;
        }
        else {
            this._chunkRebuildQueMap[chunkKey][substance] = true;
        }
    },
    awaitAllLightUpdates() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return PropagationCommManager.__numLightUpdates == 0;
            },
            checkInterval: 1,
        });
    },
    runRebuildQue() {
        const queue = this._chunkRebuildQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            DVEW.buildChunk(position[0], position[1], position[2]);
        }
    },
    runRGBFloodFillAt(x, y, z) {
        const comm = this.propagators[this.count];
        comm.sendMessage(0, [x, y, z]);
        this.count++;
        if (this.count >= this.numWorldGens) {
            this.count = 0;
        }
    },
    runRGBFloodRemoveAt(x, y, z) {
        const comm = this.propagators[this.count];
        comm.sendMessage(1, [x, y, z]);
        this.count++;
        if (this.count >= this.numWorldGens) {
            this.count = 0;
        }
    },
    areRGBLightUpdatesAllDone() {
        return Atomics.load(this.states, 0) == 0;
    },
    areRGBLightRemovesAllDone() {
        return Atomics.load(this.states, 1) == 0;
    },
};
