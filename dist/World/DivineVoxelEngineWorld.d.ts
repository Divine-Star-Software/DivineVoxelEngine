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
    worldBounds: {
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        regionTotalChunks: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithFlat3DArray: (flat3dArray: import("../Global/Util/Flat3DArray.js").Flat3DArray) => void;
        setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
        setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
        getRegionPosition: (x: number, y: number, z: number) => {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition: (x: number, y: number, z: number) => {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
            x: number;
            y: number;
            z: number;
        };
    };
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    engineSettings: EngineSettings;
    UTIL: Util;
    builderCommManager: BuilderCommManager;
    fluidBuilderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        fluidMeshHasBeenUpdated: boolean;
        ready: boolean;
    } & {
        fluidMeshHasBeenUpdated: boolean;
        setChunkTemplateForFluidMesh: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
            ready: boolean;
        }, chunkX: number, chunkY: number, chunkZ: number, template: import("../Meta/index.js").ChunkTemplate) => void;
        requestFluidMeshBeReBuilt: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
            ready: boolean;
        }) => void;
        requestFullChunkBeRemoved: (this: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
            fluidMeshHasBeenUpdated: boolean;
            ready: boolean;
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
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    buildChunkO(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunkAsync(chunkX: number, chunkY: number, chunkZ: number): Promise<boolean>;
    buildFluidMesh(): void;
    $INIT(data: DVEWInitData): Promise<void>;
}
export declare const DVEW: DivineVoxelEngineWorld;
