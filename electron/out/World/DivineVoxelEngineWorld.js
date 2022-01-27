import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { InitWorldWorker } from "./Functions/InitWorldWorker.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export class DivineVoxelEngineWorld {
    worker;
    settings = {
        voxelPaletteMode: "per-chunk",
    };
    UTIL = new Util();
    builderManager = new BuilderManager();
    worldGeneration = new WorldGeneration(this);
    worldData = new WorldData(this);
    textureManager = new TextureManager();
    voxelManager = new VoxelManager();
    voxelHelper = new VoxelHelper(this.UTIL, this.worldData, this.textureManager, this.voxelManager);
    chunkProccesor = new ChunkProcessor(this);
    constructor(worker) {
        this.worker = worker;
        this.builderManager.setMainThreadCom(this.worker);
    }
    removeChunk(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        this.builderManager.requestFullChunkBeRemoved(chunkX, chunkZ);
        this.worldData.removeChunk(chunkX, chunkY, chunkZ);
        return true;
    }
    buildChunk(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        let palette = chunk.voxelPalette;
        if (this.settings.voxelPaletteMode == "global" && !chunk.voxelPalette) {
            palette = this.worldGeneration.getGlobalVoxelPalette();
        }
        // let t0= performance.now();
        const template = this.chunkProccesor.makeAllChunkTemplates(chunk, palette, chunkX, chunkY, chunkZ);
        this.builderManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template);
        // let t1= performance.now();
        // console.log(t1 - t0);
        return true;
    }
    async buildChunkAsync(chunkX, chunkY, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        let palette = chunk.voxelPalette;
        if (this.settings.voxelPaletteMode == "global" && !chunk.voxelPalette) {
            palette = this.worldGeneration.getGlobalVoxelPalette();
        }
        const template = this.chunkProccesor.makeAllChunkTemplatesAsync(chunk, palette, chunkX, chunkY, chunkZ);
        // console.log("sending")
        // this.builderManager.requestFullChunkBeBuiltAsync(chunkX, chunkY, chunkZ, template);
        return true;
    }
    buildFluidMesh() {
        this.builderManager.requestFluidMeshBeReBuilt();
    }
    async $INIT(data) {
        this.settings.voxelPaletteMode = data.voxelPaletteMode;
        await InitWorldWorker(this, data.onReady, data.onMessage, data.onRestart);
    }
}