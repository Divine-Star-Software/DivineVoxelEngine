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
        voxelPalletMode: "per-chunk",
    };
    UTIL = new Util();
    builderManager = new BuilderManager();
    worldGeneration = new WorldGeneration();
    worldData = new WorldData(this);
    textureManager = new TextureManager();
    voxelManager = new VoxelManager();
    voxelHelper = new VoxelHelper(this.UTIL, this.worldData, this.textureManager, this.voxelManager);
    chunkProccesor = new ChunkProcessor(this);
    constructor(worker) {
        this.worker = worker;
        this.builderManager.setMainThreadCom(this.worker);
    }
    removeChunk(chunkX, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkZ);
        if (!chunk)
            return false;
        this.builderManager.requestChunkBeRemoved(chunkX, chunkZ);
        this.worldData.removeChunk(chunkX, chunkZ);
        return true;
    }
    buildChunk(chunkX, chunkZ) {
        const chunk = this.worldData.getChunk(chunkX, chunkZ);
        if (!chunk)
            return false;
        let pallet = chunk.voxelPallet;
        if (this.settings.voxelPalletMode == "global" && !chunk.voxelPallet) {
            pallet = this.worldGeneration.getGlobalVoxelPallet();
        }
        const template = this.chunkProccesor.makeAllChunkTemplates(chunk.voxels, pallet, chunkX, chunkZ);
        this.builderManager.requestFullChunkBeBuilt(chunkX, chunkZ, template);
        return true;
    }
    async $INIT(data) {
        this.settings.voxelPalletMode = data.voxelPalletMode;
        await InitWorldWorker(this, data.onReady, data.onMessage);
    }
}
