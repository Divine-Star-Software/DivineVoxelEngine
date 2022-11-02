//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
export const DVEP = {
    illumination: IlluminationManager,
    flow: FlowManager,
    rebuildQueMap: {},
    $INIT() { },
    _dimension: "main",
    _buildQueue: "main",
    addToRebuildQue(x, y, z, substance) {
        if (DVEC.settings.settings.server.enabled)
            return;
        const chunkPOS = WorldBounds.getChunkPosition(x, y, z);
        const chunkKey = WorldBounds.getChunkKey(chunkPOS);
        if (!this.rebuildQueMap[chunkKey]) {
            this.rebuildQueMap[chunkKey] = true;
            DVEC.worldComm.runTasks(WorldTasks.addToRebuildQue, [
                this._dimension,
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
                this._buildQueue,
            ]);
        }
    },
    _process(data) {
        this._dimension = data[0];
        this._buildQueue = data[4];
    },
    resetRebuildQue() {
        this.rebuildQueMap = {};
    },
    runRebuildQue() {
        DVEC.worldComm.runTasks(WorldTasks.runRebuildQue, [
            this._buildQueue,
        ]);
        this.rebuildQueMap = {};
    },
    runRGBFloodFill(data) {
        this._process(data);
        WorldRegister.cache.enable();
        this.illumination.runRGBFloodFillAt(data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runRGBFloodRemove(data) {
        this._process(data);
        WorldRegister.cache.enable();
        this.illumination.runRGBFloodRemoveAt(true, data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runSunLightForWorldColumn(x, z, maxY) {
        WorldRegister.cache.enable();
        this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runSunFloodFillAtMaxY(x, z, maxY) {
        WorldRegister.cache.enable();
        this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runSunFloodFillMaxYFlood(x, z, maxY) {
        WorldRegister.cache.enable();
        this.illumination.runSunLightFloodOut(x, z);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runSunLightUpdate(data) {
        this._process(data);
        WorldRegister.cache.enable();
        this.illumination.runSunLightUpdateAt(data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    runSunLightRemove(data) {
        this._process(data);
        WorldRegister.cache.enable();
        this.illumination.runSunLightRemoveAt(data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    async updateFlowAt(data) {
        this._process(data);
        WorldRegister.cache.enable();
        await this.flow.runFlow(data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
    async removeFlowAt(data) {
        this._process(data);
        WorldRegister.cache.enable();
        await this.flow.runFlowRemove(data[1], data[2], data[3]);
        WorldRegister.cache.disable();
        this.rebuildQueMap = {};
    },
};
