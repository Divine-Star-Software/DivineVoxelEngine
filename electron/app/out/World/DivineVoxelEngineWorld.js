//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
//classes
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
//comms
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { BuilderCommManager } from "./InterComms/Builder/BuilderCommManager.js";
import { WorldBounds } from "../Global/WorldBounds/WorldBounds.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export class DivineVoxelEngineWorld {
    environment = "browser";
    worldBounds = WorldBounds;
    __settingsHaveBeenSynced = false;
    __renderIsDone = false;
    engineSettings = EngineSettings;
    UTIL = Util;
    builderCommManager = new BuilderCommManager(this);
    worldGeneration = new WorldGeneration(this);
    renderComm = RenderComm;
    worldData = new WorldData(this);
    matrix = new Matrix(this);
    matrixCentralHub = new MatrixCentralHub(this);
    nexusComm = NexusComm;
    voxelManager = new VoxelManager(this);
    constructor() { }
    isReady() {
        let ready = this.builderCommManager.isReady() &&
            this.__settingsHaveBeenSynced &&
            this.__renderIsDone;
        return ready;
    }
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.worldBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldData.syncChunkBounds();
            this.worldGeneration.illumantionManager.syncChunkBounds();
            this.worldGeneration.chunkDataHelper.syncChunkBounds();
        }
        if (data.regions) {
            this.worldBounds.setRegionBounds(data.regions.regionXPow2, data.regions.regionYPow2, data.regions.regionZPow2);
        }
        this.__settingsHaveBeenSynced = true;
    }
    runRGBLightUpdateQue() {
        const queue = this.worldData.getRGBLightUpdateQue();
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            this.worldGeneration.illumantionManager.runRGBFloodFillAt(position[0], position[1], position[2]);
        }
        this.worldData.clearRGBLightUpdateQue();
    }
    clearRGBLightUpdateQue() {
        this.worldData.clearRGBLightUpdateQue();
    }
    runRGBLightRemoveQue() {
        const queue = this.worldData.getRGBLightRemoveQue();
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            this.worldGeneration.illumantionManager.runRGBFloodRemoveAt(true, position[0], position[1], position[2]);
        }
        this.worldData.clearRGBLightRemoveQue();
    }
    clearRGBLightRemoveQue() {
        this.worldData.clearRGBLightRemoveQue();
    }
    runChunkRebuildQue() {
        const queue = this.worldData.getChunkRebuildQue();
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            const substance = this.worldData.getSubstanceNeededToRebuild(position[0], position[1], position[2]);
            if (substance.all) {
                this.buildChunk(position[0], position[1], position[2]);
            }
        }
        this.worldData.clearChunkRebuildQue();
    }
    clearChunkRebuildQue() {
        this.worldData.clearChunkRebuildQue();
    }
    removeChunk(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        // this.builderComm.requestFullChunkBeRemoved(chunkX, chunkZ);
        this.renderComm.sendMessage("remove-chunk", [chunkX, chunkZ]);
        this.worldData.removeChunk(chunkX, chunkY, chunkZ);
        return true;
    }
    buildChunk(chunkX, chunkY, chunkZ) {
        this.builderCommManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ);
    }
    async $INIT(data) {
        await InitWorldWorker(this, data.onReady, data.onMessage, data.onRestart);
    }
}
export const DVEW = new DivineVoxelEngineWorld();
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
    DVEW.environment = "node";
}
