//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Constants/InterComms/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
export const DVEP = {
    illumination: IlluminationManager,
    flow: FlowManager,
    rebuildQueMap: {},
    $INIT() { },
    addToRebuildQue(x, y, z, substance) {
        if (DVEC.settings.settings.server.enabled)
            return;
        const chunkPOS = DVEC.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = DVEC.worldBounds.getChunkKey(chunkPOS);
        if (!this.rebuildQueMap[chunkKey]) {
            this.rebuildQueMap[chunkKey] = true;
            DVEC.worldComm.sendMessage(WorldTasks.addToRebuildQue, [
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
                substance,
            ]);
        }
    },
    resetRebuildQue() {
        this.rebuildQueMap = {};
    },
    runRebuildQue() {
        DVEC.worldComm.sendMessage(WorldTasks.runRebuildQue, []);
        this.rebuildQueMap = {};
    },
    runRGBFloodFill(x, y, z) {
        this.illumination.runRGBFloodFillAt(x, y, z);
        this.rebuildQueMap = {};
    },
    runRGBFloodRemove(x, y, z) {
        this.illumination.runRGBFloodRemoveAt(true, x, y, z);
        this.rebuildQueMap = {};
    },
    runSunLightForWorldColumn(x, z, maxY) {
        this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
        this.rebuildQueMap = {};
    },
    runSunFloodFillAtMaxY(x, z, maxY) {
        this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
        this.rebuildQueMap = {};
    },
    runSunFloodFillMaxYFlood(x, z, maxY) {
        this.illumination.runSunLightFloodOut(x, z);
        this.rebuildQueMap = {};
    },
    runSunLightUpdate(x, y, z) {
        this.illumination.runSunLightUpdateAt(x, y, z);
        this.rebuildQueMap = {};
    },
    runSunLightRemove(x, y, z) {
        this.illumination.runSunLightRemoveAt(x, y, z);
        this.rebuildQueMap = {};
    },
    async updateFlowAt(x, y, z) {
        await this.flow.runFlow(x, y, z);
        this.rebuildQueMap = {};
    },
    async removeFlowAt(x, y, z) {
        await this.flow.runFlowRemove(x, y, z);
        this.rebuildQueMap = {};
    },
};
