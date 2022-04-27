import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { BuilderCommManager } from "./InterComms/Builder/BuilderCommManager.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare class DivineVoxelEngineWorld {
    environment: "node" | "browser";
    worker: Worker;
    chunkBounds: ChunkBounds;
    engineSettings: EngineSettings;
    UTIL: Util;
    builderCommManager: BuilderCommManager;
    fluidBuilderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        fluidMeshHasBeenUpdated: boolean;
    } & {
        fluidMeshHasBeenUpdated: boolean;
        setChunkTemplateForFluidMesh: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
        }, chunkX: number, chunkY: number, chunkZ: number, template: import("../Meta/index.js").ChunkTemplate) => void;
        requestFluidMeshBeReBuilt: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
        }) => void;
        requestFullChunkBeRemoved: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
        }, chunkX: number, chunkZ: number) => void;
    };
    worldGeneration: WorldGeneration;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldData: WorldData;
    matrix: Matrix;
    matrixCentralHub: MatrixCentralHub;
    nexusComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    textureManager: TextureManager;
    voxelManager: VoxelManager;
    voxelHelper: VoxelHelper;
    chunkProccesor: ChunkProcessor;
    constructor(worker: Worker);
    isReady(): boolean;
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
