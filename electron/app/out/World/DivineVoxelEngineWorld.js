//classes
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderComm } from "./Builder/BuilderComm.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { NexusComm } from "./Nexus/NexusComm.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export class DivineVoxelEngineWorld {
    worker;
    chunkBounds = new ChunkBounds();
    engineSettings = new EngineSettings();
    UTIL = new Util();
    builderComm = new BuilderComm(this);
    worldGeneration = new WorldGeneration(this);
    worldData = new WorldData(this);
    matrix = new Matrix(this);
    matrixCentralHub = new MatrixCentralHub(this);
    nexusComm = new NexusComm(this);
    textureManager = new TextureManager();
    voxelManager = new VoxelManager();
    voxelHelper = new VoxelHelper(this.UTIL, this.worldData, this.textureManager, this.voxelManager);
    chunkProccesor = new ChunkProcessor(this);
    constructor(worker) {
        this.worker = worker;
        this.builderComm.setMainThreadCom(this.worker);
    }
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.chunkBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldData.syncChunkBounds();
        }
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
                this.buildChunkAsync(position[0], position[1], position[2]);
                this.buildFluidMesh();
            }
        }
        this.worldData.clearChunkRebuildQue();
    }
    async runChunkRebuildQueAsync() {
        const queue = this.worldData.getChunkRebuildQue();
        while (queue.length != 0) {
            const position = queue.shift();
            if (!position)
                break;
            const substance = this.worldData.getSubstanceNeededToRebuild(position[0], position[1], position[2]);
            if (substance.all) {
                this.buildChunkAsync(position[0], position[1], position[2]);
                this.buildFluidMesh();
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
        this.builderComm.requestFullChunkBeRemoved(chunkX, chunkZ);
        this.worldData.removeChunk(chunkX, chunkY, chunkZ);
        return true;
    }
    buildChunk(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        // let t0= performance.now();
        const template = this.chunkProccesor.makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ);
        this.builderComm.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template);
        // let t1= performance.now();
        // console.log(t1 - t0);
        return true;
    }
    async buildChunkAsync(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        const template = this.chunkProccesor.makeAllChunkTemplatesAsync(chunk, chunkX, chunkY, chunkZ);
        // console.log("sending")
        // this.builderManager.requestFullChunkBeBuiltAsync(chunkX, chunkY, chunkZ, template);
        return true;
    }
    buildFluidMesh() {
        this.builderComm.requestFluidMeshBeReBuilt();
    }
    async $INIT(data) {
        await InitWorldWorker(this, data.onReady, data.onMessage, data.onRestart);
    }
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX, chunkY, chunkZ) {
        this.nexusComm.nexusLoadChunk(chunkX, chunkY, chunkZ);
    }
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX, chunkY, chunkZ) {
        this.nexusComm.removeChunkFromNexus(chunkX, chunkY, chunkZ);
    }
}
//@ts-ignore
export const DVEW = new DivineVoxelEngineWorld(self);
