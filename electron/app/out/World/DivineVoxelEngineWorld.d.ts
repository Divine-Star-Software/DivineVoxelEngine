import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builder/BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { MatrixThreadCentralHub } from "./Matrix/MatrixThreadCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export declare class DivineVoxelEngineWorld {
    worker: Worker;
    chunkBounds: ChunkBounds;
    engineSettings: EngineSettings;
    UTIL: Util;
    builderManager: BuilderManager;
    worldGeneration: WorldGeneration;
    worldData: WorldData;
    matrix: Matrix;
    matrixThreadCentralHub: MatrixThreadCentralHub;
    textureManager: TextureManager;
    voxelManager: VoxelManager;
    voxelHelper: VoxelHelper;
    chunkProccesor: ChunkProcessor;
    constructor(worker: Worker);
    syncSettings(data: EngineSettingsData): void;
    runRGBLightUpdateQue(): void;
    clearRGBLightUpdateQue(): void;
    runRGBLightRemoveQue(): void;
    clearRGBLightRemoveQue(): void;
    runChunkRebuildQue(): void;
    runChunkRebuildQueAsync(): Promise<void>;
    clearChunkRebuildQue(): void;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunkAsync(chunkX: number, chunkY: number, chunkZ: number): Promise<boolean>;
    buildFluidMesh(): void;
    $INIT(data: DVEWInitData): Promise<void>;
}
