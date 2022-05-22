//comms
import { GetNewWorldGenComm } from "./WorldGenComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export const WorldGenCommManager = {
    count: 0,
    numWorldGens: 0,
    states: new Int32Array(),
    __numLightUpdates: 0,
    worldGens: [],
    worldGensConnected: 0,
    $INIT() {
        const sab = new SharedArrayBuffer(4 * 4);
        WorldGenCommManager.states = new Int32Array(sab);
        WorldGenCommManager.states[1] = 1000;
        for (const worldGen of this.worldGens) {
            worldGen.sendMessage(-1, [sab]);
        }
    },
    addWorldGen(port) {
        const newComm = GetNewWorldGenComm(this.numWorldGens + 1, port);
        this.worldGens.push(newComm);
    },
    syncChunkInAllWorldGens(chunkX, chunkY, chunkZ) {
        for (const worldGen of this.worldGens) {
            DVEW.matrixCentralHub.syncChunkInThread(worldGen.name, chunkX, chunkY, chunkZ);
        }
    },
    releaseChunkInAllWorldGens(chunkX, chunkY, chunkZ) {
        for (const worldGen of this.worldGens) {
            DVEW.matrixCentralHub.releaseChunkInThread(worldGen.name, chunkX, chunkY, chunkZ);
        }
    },
    syncRegionInAllWorldGens(regionX, regionY, regionZ) {
        for (const worldGen of this.worldGens) {
            DVEW.matrixCentralHub.syncRegionInThread(worldGen.name, regionX, regionY, regionZ);
        }
    },
    releaseRegionInAllWorldGens(regionX, regionY, regionZ) {
        for (const worldGen of this.worldGens) {
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
                return WorldGenCommManager.__numLightUpdates == 0;
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
        const comm = this.worldGens[this.count];
        comm.sendMessage(0, [x, y, z]);
        this.count++;
        if (this.count >= this.numWorldGens) {
            this.count = 0;
        }
    },
    runRGBFloodRemoveAt(x, y, z) {
        const comm = this.worldGens[this.count];
        comm.sendMessage(1, [x, y, z]);
        this.count++;
        if (this.count >= this.numWorldGens) {
            this.count = 0;
        }
    },
    areRGBLightUpdatesAllDone() {
        return Atomics.load(this.states, 0) == 0;
    },
};
