//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
export const Propagation = {
    illumination: IlluminationManager,
    flow: FlowManager,
    explosion: ExplosionManager,
    rebuildQueMap: new Map(),
    $INIT() { },
    _dimension: "main",
    _buildQueue: "main",
    _priority: 0,
    setPriority(priority = 2) {
        this._priority = priority;
    },
    addToRebuildQue(x, y, z, substance) {
        if (DVEC.settings.settings.server.enabled)
            return;
        const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
        const chunkKey = WorldSpaces.chunk.getKey();
        if (!this.rebuildQueMap.has(this._buildQueue)) {
            this.rebuildQueMap.set(this._buildQueue, new Map());
        }
        const map = this.rebuildQueMap.get(this._buildQueue);
        if (!map)
            return;
        if (!map.has(chunkKey)) {
            map.set(chunkKey, true);
            DVEC.worldComm.runTasks(ConstructorRemoteThreadTasks.addToRebuildQue, [
                [this._dimension, chunkPOS.x, chunkPOS.y, chunkPOS.z],
                this._buildQueue,
                this._priority,
            ]);
        }
    },
    setBuildData(dimension, buildQueue) {
        this._dimension = dimension;
        this._buildQueue = buildQueue;
    },
    _process(data) {
        this._dimension = data[0][0];
        this._buildQueue = data[1];
    },
    resetRebuildQue() {
        this.rebuildQueMap.clear();
    },
    runRebuildQue() {
        DVEC.worldComm.runTasks(ConstructorRemoteThreadTasks.runRebuildQue, [this._buildQueue]);
        this.rebuildQueMap.clear();
    },
    runRGBUpdate(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.illumination.runRGBUpdateAt(x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    runRGBRemove(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.illumination.runRGBRemoveAt(true, x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    runSunLightUpdate(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.illumination.runSunLightUpdateAt(x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    runSunLightRemove(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.illumination.runSunLightRemoveAt(x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    async updateFlowAt(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.flow._sDataTool.setDimension(dimesnion);
        this.flow._nDataTool.setDimension(dimesnion);
        await this.flow.runFlow(x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    async removeFlowAt(data) {
        this._process(data);
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this.illumination._sDataTool.setDimension(dimesnion);
        this.illumination._nDataTool.setDimension(dimesnion);
        this.flow._sDataTool.setDimension(dimesnion);
        this.flow._nDataTool.setDimension(dimesnion);
        await this.flow.runFlowRemove(x, y, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    runExplosion(data) {
        WorldRegister.cache.enable();
        const [dimesnion, x, y, z] = data[0];
        this._dimension = dimesnion;
        this._buildQueue = data[2];
        this.explosion.runExplosion(dimesnion, x, y, z, data[1]);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
    runWorldSun(data) {
        WorldRegister.cache.enable();
        this.illumination.runWorldSun(data);
        WorldRegister.cache.disable();
        this.rebuildQueMap.clear();
    },
};
