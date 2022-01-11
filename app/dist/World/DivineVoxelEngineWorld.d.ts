import { DVEW } from "Meta/Contents/World/DVEW.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextreManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export declare class DivineVoxelEngineWorld implements DVEW {
    worker: Worker;
    UTIL: Util;
    builderManager: BuilderManager;
    worldData: WorldData;
    textureManager: TextureManager;
    voxelHelper: VoxelHelper;
    voxelManager: VoxelManager;
    chunkProccesor: ChunkProcessor;
    constructor(worker: Worker);
    removeChunk(chunkX: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkZ: number): boolean;
    $INIT(data: {
        onReady: Function;
        onMessage: (message: string, data: any[]) => void;
    }): void;
}
