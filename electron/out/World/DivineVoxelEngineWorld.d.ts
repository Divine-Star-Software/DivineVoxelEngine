import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderComm } from "./InterComms/Builder/BuilderComm.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare class DivineVoxelEngineWorld {
    worker: Worker;
    chunkBounds: ChunkBounds;
    engineSettings: EngineSettings;
    UTIL: Util;
    builderComm: BuilderComm;
    worldGeneration: WorldGeneration;
    worldData: WorldData;
    matrix: Matrix;
    matrixCentralHub: MatrixCentralHub;
    nexusComm: NexusComm;
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
export declare const DVEW: DivineVoxelEngineWorld;
