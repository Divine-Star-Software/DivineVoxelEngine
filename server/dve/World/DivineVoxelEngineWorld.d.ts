import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { BuilderCommManager } from "./InterComms/Builder/BuilderCommManager.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare class DivineVoxelEngineWorld {
    environment: "node" | "browser";
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
        syncBoundsWithFlat3DArray: (flat3dArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        }) => void;
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
        getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
        getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
        getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
            x: number;
            y: number;
            z: number;
        };
    };
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    UTIL: {
        calculateGameZone(positionZ: number, positionX: number): number[];
        getFlat3DArray(): {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
        getVoxelByte(): {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        getLightByte(): {
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(currentVoxel: number): number;
            getMinusOneForSun(sl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        getInfoByte(number?: number): {
            maxBit: number;
            minBit: number;
            maxDec: number;
            minDec: number;
            byteValue: number;
            getNumberValue(): number;
            setNumberValue(newValue: number): void;
            getBit(index: number): 0 | 1;
            getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
            getHalfByteDec(bitIndex: number): number;
            setHalfByteBits(index: number, value: number): void;
            setBit(index: number, value: 0 | 1): void;
            toArray(): (0 | 1)[];
            toString(delimiter?: string): string;
        };
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    builderCommManager: BuilderCommManager;
    worldGeneration: WorldGeneration;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldData: WorldData;
    matrix: Matrix;
    matrixCentralHub: MatrixCentralHub;
    nexusComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    voxelManager: VoxelManager;
    constructor();
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    runRGBLightUpdateQue(): void;
    clearRGBLightUpdateQue(): void;
    runRGBLightRemoveQue(): void;
    clearRGBLightRemoveQue(): void;
    runChunkRebuildQue(): void;
    clearChunkRebuildQue(): void;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    $INIT(data: DVEWInitData): Promise<void>;
}
export declare const DVEW: DivineVoxelEngineWorld;
