import { EngineSettings } from "../Global/EngineSettings.js";
import type { DVEWInitData } from "Meta/World/DVEW";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export declare class DivineVoxelEngineWorld {
    worker: Worker;
    settings: {
        voxelPaletteMode: string;
    };
    engineSettings: EngineSettings;
    UTIL: Util;
    builderManager: BuilderManager;
    worldGeneration: WorldGeneration;
    worldData: WorldData;
    textureManager: TextureManager;
    voxelManager: VoxelManager;
    voxelHelper: VoxelHelper;
    chunkProccesor: ChunkProcessor;
    constructor(worker: Worker);
    syncSettings(data: EngineSettingsData): void;
    runChunkRebuildQue(): void;
    runChunkRebuildQueAsync(): Promise<void>;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunkAsync(chunkX: number, chunkY: number, chunkZ: number): Promise<boolean>;
    buildFluidMesh(): void;
    $INIT(data: DVEWInitData): Promise<void>;
}
