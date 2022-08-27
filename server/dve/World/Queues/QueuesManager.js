//objects
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { QueuesIndexes } from "../../Constants/Queues.js";
export const QueuesManager = {
    _numChunksRebuilding: 0,
    _numRGBLightUpdates: 0,
    _numRGBLightRemoves: 0,
    _RGBLightRemoveQue: [],
    _RGBLightUpdateQue: [],
    _SunLightRemoveQue: [],
    _SunLightUpdateQue: [],
    _runFlowQue: [],
    _removeFlowQue: [],
    _worldColumnSunLightPropMap: {},
    _worldColumnSunLightPropQue: [],
    _chunkRebuildQueMap: {},
    _chunkRebuildQue: [],
    __statesSAB: new SharedArrayBuffer(4 * 12),
    __states: new Uint32Array(),
    $INIT() {
        this.__states = new Uint32Array(this.__statesSAB);
        DVEW.constructorCommManager.$INIT(this.__statesSAB);
    },
    addWorldColumnToSunLightQue(x, z) {
        const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(x, z);
        if (!this._worldColumnSunLightPropMap[worldColumnKey]) {
            this._worldColumnSunLightPropQue.push([x, z]);
            this._worldColumnSunLightPropMap[worldColumnKey] = { max: 0, thread: 0 };
        }
    },
    async runWorldColumnSunLightAndUpateQue() {
        const queue = this._worldColumnSunLightPropQue;
        let i = queue.length;
        //stage 1 fill with full sun light
        while (i--) {
            const position = queue[i];
            const x = position[0];
            const z = position[1];
            DVEW.worldData.fillWorldCollumnWithChunks(x, z);
            const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(x, z);
            const maxY = DVEW.worldData.getRelativeMaxWorldColumnHeight(x, z);
            Atomics.add(this.__states, QueuesIndexes.worldColumnSunLightProp, 1);
            DVEW.constructorCommManager.runSunLightForWorldColumn(x, z, maxY);
            this._worldColumnSunLightPropMap[worldColumnKey] = { max: maxY, thread: 0 };
        }
        i = queue.length;
        await this.awaitAllWorldColumnSunLightProp();
        //stage 2 flood down from maxY
        while (i--) {
            const position = queue[i];
            const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(position[0], position[1]);
            const data = this._worldColumnSunLightPropMap[worldColumnKey];
            const x = position[0];
            const z = position[1];
            data.thread = DVEW.constructorCommManager.runSunFillAtMaxY(x, z, data.max);
            Atomics.add(this.__states, QueuesIndexes.sunLgithUpdateMaxY, 1);
        }
        await this.awaitAllSunLightUpdatesAtMaxY();
        //stage 3 flood out from maxY
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(position[0], position[1]);
            const data = this._worldColumnSunLightPropMap[worldColumnKey];
            const x = position[0];
            const z = position[1];
            data.thread = DVEW.constructorCommManager.runSunFillMaxYFlood(x, z, data.max, data.thread);
            Atomics.add(this.__states, QueuesIndexes.sunLightMaxYFlood, 1);
        }
        this._worldColumnSunLightPropMap = {};
        this._worldColumnSunLightPropQue = [];
        await this.awaitAllSunLightUpdatesMaxYFlood();
    },
    awaitAllWorldColumnSunLightProp() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areWorldColumnSunLightUpdatsDone();
            },
            checkInterval: 1,
        });
    },
    areWorldColumnSunLightUpdatsDone() {
        return (Atomics.load(this.__states, QueuesIndexes.worldColumnSunLightProp) == 0);
    },
    awaitAllSunLightUpdatesAtMaxY() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areAllSunLightUpdatesAtMaxYDone();
            },
            checkInterval: 1,
        });
    },
    areAllSunLightUpdatesAtMaxYDone() {
        return Atomics.load(this.__states, QueuesIndexes.sunLgithUpdateMaxY) == 0;
    },
    awaitAllSunLightUpdatesMaxYFlood() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areAllSunLightUpdatesMaxYFloodDone();
            },
            checkInterval: 1,
        });
    },
    areAllSunLightUpdatesMaxYFloodDone() {
        return Atomics.load(this.__states, QueuesIndexes.sunLightMaxYFlood) == 0;
    },
    /**
     * Sun Light
     */
    addToSunLightUpdateQue(x, y, z) {
        this._SunLightUpdateQue.push([x, y, z]);
    },
    addToSunLightRemoveQue(x, y, z) {
        this._SunLightRemoveQue.push([x, y, z]);
    },
    runSunLightUpdateQue() {
        const queue = this._SunLightUpdateQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(this.__states, QueuesIndexes.sunLightUpdate, 1);
            DVEW.constructorCommManager.runSunLightUpdate(position[0], position[1], position[2]);
        }
        this._SunLightUpdateQue = [];
    },
    runSunLightRemoveQue() {
        const queue = this._SunLightRemoveQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(this.__states, QueuesIndexes.sunLightRemove, 1);
            DVEW.constructorCommManager.runSunLightRemove(position[0], position[1], position[2]);
        }
        this._SunLightRemoveQue = [];
    },
    awaitAllSunLightUpdates() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areSunLightUpdatesAllDone();
            },
            checkInterval: 1,
        });
    },
    awaitAllSunLightRemove() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areSunLightRemovesAllDone();
            },
            checkInterval: 1,
        });
    },
    areSunLightUpdatesAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.sunLightUpdate) == 0;
    },
    areSunLightRemovesAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.sunLightRemove) == 0;
    },
    /**
     * RGB Light
     */
    addToRGBUpdateQue(x, y, z) {
        this._RGBLightUpdateQue.push([x, y, z]);
    },
    addToRGBRemoveQue(x, y, z) {
        this._RGBLightRemoveQue.push([x, y, z]);
    },
    runRGBUpdateQue(filter) {
        const reQueue = [];
        const queue = this._RGBLightUpdateQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            if (filter) {
                const filterReturn = filter(position[0], position[1], position[2]);
                if (filterReturn == 0)
                    continue;
                if (filterReturn == 1) {
                    reQueue.push([position[0], position[1], position[2]]);
                    continue;
                }
            }
            Atomics.add(this.__states, QueuesIndexes.RGBLightUpdate, 1);
            DVEW.constructorCommManager.runRGBLightUpdate(position[0], position[1], position[2]);
        }
        if (!filter) {
            this._RGBLightUpdateQue = [];
        }
        else {
            this._RGBLightUpdateQue = reQueue;
        }
    },
    runRGBRemoveQue() {
        const queue = this._RGBLightRemoveQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(this.__states, QueuesIndexes.RGBLightRemove, 1);
            DVEW.constructorCommManager.runRGBUpdate(position[0], position[1], position[2]);
        }
        this._RGBLightRemoveQue = [];
    },
    awaitAllRGBLightUpdates() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areRGBLightUpdatesAllDone();
            },
            checkInterval: 1,
        });
    },
    awaitAllRGBLightRemove() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areRGBLightRemovesAllDone();
            },
            checkInterval: 1,
        });
    },
    areRGBLightUpdatesAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.RGBLightUpdate) == 0;
    },
    areRGBLightRemovesAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.RGBLightRemove) == 0;
    },
    /**
     * Flow
     */
    addToFlowRunQue(x, y, z) {
        this._runFlowQue.push([x, y, z]);
    },
    addToFlowRemoveQue(x, y, z) {
        this._removeFlowQue.push([x, y, z]);
    },
    runFlowRuneQue(filter) {
        const reQueue = [];
        const queue = this._runFlowQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            if (filter) {
                const filterReturn = filter(position[0], position[1], position[2]);
                if (filterReturn == 0)
                    continue;
                if (filterReturn == 1) {
                    reQueue.push([position[0], position[1], position[2]]);
                    continue;
                }
            }
            Atomics.add(this.__states, QueuesIndexes.flowsRunning, 1);
            DVEW.constructorCommManager.runFlow(position[0], position[1], position[2]);
        }
        if (!filter) {
            this._runFlowQue = [];
        }
        else {
            this._runFlowQue = reQueue;
        }
    },
    runFlowRemoveQue() {
        const queue = this._removeFlowQue;
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            Atomics.add(this.__states, QueuesIndexes.flowsRemoving, 1);
            DVEW.constructorCommManager.removeFlow(position[0], position[1], position[2]);
        }
        this._removeFlowQue = [];
    },
    awaitAllFlowRuns() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areFlowRunsAllDone();
            },
            checkInterval: 1,
        });
    },
    awaitAllFlowRemoves() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areFlowRemovesAllDone();
            },
            checkInterval: 1,
        });
    },
    areFlowRunsAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.flowsRunning) == 0;
    },
    areFlowRemovesAllDone() {
        return Atomics.load(this.__states, QueuesIndexes.flowsRemoving) == 0;
    },
    /**
     * Chunks
     */
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
    runRebuildQue(filter) {
        const queue = this._chunkRebuildQue;
        const reQueue = [];
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            if (filter) {
                const filterReturn = filter(position[0], position[1], position[2]);
                if (filterReturn == 0)
                    continue;
                if (filterReturn == 1) {
                    reQueue.push([position[0], position[1], position[2]]);
                    continue;
                }
            }
            delete this._chunkRebuildQueMap[DVEW.worldBounds.getChunkKeyFromPosition(position[0], position[1], position[2])];
            DVEW.buildChunk(position[0], position[1], position[2]);
        }
        if (filter) {
            this._chunkRebuildQue = reQueue;
        }
        else {
            this._chunkRebuildQue = [];
        }
    },
    addToRebuildQueTotal() {
        Atomics.add(this.__states, QueuesIndexes.chunksBuilding, 1);
    },
    awaitAllChunksToBeBuilt() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areAllChunksDoneBuilding();
            },
            checkInterval: 1,
        });
    },
    areAllChunksDoneBuilding() {
        return Atomics.load(this.__states, QueuesIndexes.chunksBuilding) == 0;
    },
    addToGenerationTotal() {
        Atomics.add(this.__states, QueuesIndexes.generating, 1);
    },
    areAllGenerationsDone() {
        return Atomics.load(this.__states, QueuesIndexes.generating) == 0;
    },
    awaitAllGenerationsToBeDone() {
        return DVEW.UTIL.createPromiseCheck({
            check: () => {
                return QueuesManager.areAllGenerationsDone();
            },
            checkInterval: 1,
        });
    },
};
