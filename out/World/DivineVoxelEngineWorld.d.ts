import type { DVEW } from "Meta/World/DVEW";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export declare class DivineVoxelEngineWorld implements DVEW {
    worker: Worker;
    settings: {
        voxelPalletMode: string;
    };
    UTIL: Util;
    builderManager: BuilderManager;
    worldGeneration: WorldGeneration;
    worldData: WorldData;
    textureManager: TextureManager;
    voxelManager: VoxelManager;
    voxelHelper: VoxelHelper;
    chunkProccesor: ChunkProcessor;
    constructor(worker: Worker);
    removeChunk(chunkX: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkZ: number): boolean;
    buildFluidMesh(): void;
    $INIT(data: {
        voxelPalletMode: "per-chunk" | "global";
        onReady: Function;
        onMessage: (message: string, data: any[]) => void;
    }): Promise<void>;
}
