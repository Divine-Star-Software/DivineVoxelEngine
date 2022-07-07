import type { MatrixLoadedChunk, MatrixLoadedRegion } from "../Meta/Matrix/Matrix.types";
import type { VoxelManager } from "Constructor/Voxels/VoxelManager";
import type { WorldRegionPalette } from "Meta/World/WorldData/World.types.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export declare const WorldMatrix: {
    _3dArray: {
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
        getValue(x: number, y: number, z: number, array: import("../Meta/index").ChunkVoxels): number;
        getValueUseObj(position: import("../Meta/Util.types").Position3Matrix, array: import("../Meta/index").ChunkVoxels): number;
        getValueUseObjSafe(position: import("../Meta/Util.types").Position3Matrix, array: import("../Meta/index").ChunkVoxels): any;
        setValue(x: number, y: number, z: number, array: import("../Meta/index").ChunkVoxels, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types").Position3Matrix, array: import("../Meta/index").ChunkVoxels, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types").Position3Matrix, array: import("../Meta/index").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("../Meta/index").ChunkVoxels): void;
        deleteUseObj(position: import("../Meta/Util.types").Position3Matrix, array: import("../Meta/index").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types").Position3Matrix;
    };
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __worldColumnPosition: {
            x: number;
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
        syncBoundsWithArrays(): void;
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        /**# Set Chunk
         * ---
         * To be only called by the Matrix Hub.
         */
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../Meta/Util.types").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../Meta/Util.types").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../Meta/Util.types").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    lightByte: {
        _lightValues: number[];
        getS(value: number): number;
        getR(value: number): number;
        getG(value: number): number;
        getB(value: number): number;
        setS(value: number, sl: number): number;
        setR(value: number, sl: number): number;
        setG(value: number, sl: number): number;
        setB(value: number, sl: number): number;
        removeS(sl: number): number;
        hasRGBLight(sl: number): boolean;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        setLightValues(values: number[]): number;
        getLightValues(value: number): number[];
        isLessThanForRGBRemove(n1: number, n2: number): boolean;
        isLessThanForRGBAdd(n1: number, n2: number): boolean;
        isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
        getMinusOneForRGB(sl: number, nl: number): number;
        removeRGBLight(sl: number): number;
        getFullSunLight(sl: number): number;
        isLessThanForSunAdd(n1: number, n2: number): boolean;
        isLessThanForSunAddDown(n1: number, n2: number): boolean;
        isLessThanForSunAddUp(n1: number, n2: number): boolean;
        getSunLightForUnderVoxel(sl: number, nl: number): number;
        getMinusOneForSun(sl: number, nl: number): number;
        isLessThanForSunRemove(n1: number, sl: number): boolean;
        isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
        sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
        removeSunLight(sl: number): number;
    };
    updateDieTime: number;
    loadDieTime: number;
    regions: MatrixLoadedRegion;
    chunks: Record<string, Uint32Array>;
    chunkStates: Record<string, Uint8Array>;
    paletteMode: number;
    globalVoxelPalette: Record<number, string>;
    globalVoxelPaletteRecord: Record<string, string[]>;
    voxelManager: {
        voxelObjects: Record<string, import("../Meta/index").VoxelConstructorObject>;
        setShapeMap(shapeMap: Record<string, number>): void;
        getVoxel(id: string): import("../Meta/index").VoxelConstructorObject;
        getVoxelData(id: string): import("../Meta/index").VoxelData;
        registerVoxel(voxel: import("../Meta/index").VoxelConstructorObject): void;
        runVoxelHookForAll(hook: any): void;
    } | null;
    lightValueFunctions: {
        r: (value: number) => number;
        g: (value: number) => number;
        b: (value: number) => number;
        s: (value: number) => number;
    };
    threadName: string;
    setVoxelManager(voxelManager: typeof VoxelManager): void;
    syncChunkBounds(): void;
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
    __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>): void;
    getVoxel(x: number, y: number, z: number): false | string[];
    getVoxelData(x: number, y: number, z: number): false | import("../Meta/index").VoxelData;
    _createRegion(x: number, y: number, z: number): {
        chunks: {};
    };
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x: number, y: number, z: number, voxelsSAB: SharedArrayBuffer, voxelStatesSAB: SharedArrayBuffer, heightMapSAB: SharedArrayBuffer, minMaxMapSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
    getRegion(x: number, y: number, z: number): false | {
        palette?: WorldRegionPalette | undefined;
        chunks: Record<string, Record<string, MatrixLoadedChunk>>;
    };
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(x: number, y: number, z: number): false | undefined;
    getChunk(x: number, y: number, z: number): false | MatrixLoadedChunk;
    getWorldColumn(x: number, z: number): false | Record<string, MatrixLoadedChunk>;
    isChunkLocked(x: number, y: number, z: number): boolean;
    lockChunk(x: number, y: number, z: number): boolean;
    unLockChunk(x: number, y: number, z: number): boolean;
    updateChunkData(x: number, y: number, z: number, run: (chunk: {
        voxels: Uint32Array;
        chunkStates: Uint8Array;
    }) => {}): false | Promise<boolean>;
    setData(x: number, y: number, z: number, data: number): false | undefined;
    getData(x: number, y: number, z: number): any;
    getVoxelNumberID(x: number, y: number, z: number): number | false;
    getLight(x: number, y: number, z: number): number;
    setAir(x: number, y: number, z: number, lightValue: number): void;
    setFullSun(x: number, y: number, z: number): void;
    setLight(x: number, y: number, z: number, lightValue: number): void;
    getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
    sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
};
