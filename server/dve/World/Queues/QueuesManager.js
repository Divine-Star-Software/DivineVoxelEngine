//objects
import { DVEW } from "../DivineVoxelEngineWorld.js";
export const QueuesManager = {
    _numChunksRebuilding: 0,
    _numRGBLightUpdates: 0,
    _numRGBLightRemoves: 0,
    _RGBLightRemoveQue: [],
    _RGBLightUpdateQue: [],
    _chunkRebuildQueMap: {},
    _chunkRebuildQue: [],
    addToRGBUpdateQue(x, y, z) {
        this._RGBLightUpdateQue.push([x, y, z]);
    },
    addToRGBRemoveQue(x, y, z) {
        this._RGBLightRemoveQue.push([x, y, z]);
    },
    runRGBUpdateQue() {
        const queue = this._RGBLightUpdateQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(DVEW.propagationCommManager.states, 0, 1);
            DVEW.propagationCommManager.runRGBFloodFillAt(position[0], position[1], position[2]);
        }
        this._RGBLightUpdateQue = [];
    },
    runRGBRemoveQue() {
        const queue = this._RGBLightRemoveQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(DVEW.propagationCommManager.states, 1, 1);
            DVEW.propagationCommManager.runRGBFloodRemoveAt(position[0], position[1], position[2]);
        }
        this._RGBLightRemoveQue = [];
    },
    awaitAllRGBLightUpdates() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return DVEW.propagationCommManager.areRGBLightUpdatesAllDone();
            },
            checkInterval: 1,
        });
    },
    awaitAllRGBLightRemove() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return DVEW.propagationCommManager.areRGBLightRemovesAllDone();
            },
            checkInterval: 1,
        });
    },
    addToRebuildQue(x, y, z, substance) {
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
    runRebuildQue() {
        const queue = this._chunkRebuildQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            DVEW.buildChunk(position[0], position[1], position[2]);
        }
        this._chunkRebuildQue = [];
        this._chunkRebuildQueMap = {};
    },
    awaitAllChunksToBeBuilt() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager._numChunksRebuilding == 0;
            },
            checkInterval: 1,
        });
    },
};
