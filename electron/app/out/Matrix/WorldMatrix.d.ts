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
        getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
    };
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
        syncBoundsWithFlat3DArray(flat3dArray: {
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
        }): void;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    updateDieTime: number;
    loadDieTime: number;
    regions: Record<string, {
        palette?: WorldRegionPalette | undefined;
        chunks: Record<string, {
            voxels: Uint32Array;
            chunkStates: Uint8Array;
        }>;
    }>;
    chunks: Record<string, Uint32Array>;
    chunkStates: Record<string, Uint8Array>;
    paletteMode: number;
    globalVoxelPalette: Record<number, string>;
    globalVoxelPaletteRecord: Record<string, string[]>;
    regionVoxelPalettes: Record<string, Record<number, string>>;
    threadName: string;
    syncChunkBounds(): void;
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<unknown>;
    __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>): void;
    __syncRegionData(x: number, y: number, z: number, palette: WorldRegionPalette): void;
    __removeRegionVoxelPalette(x: number, y: number, z: number): false | undefined;
    getVoxel(x: number, y: number, z: number): false | string[];
    _createRegion(x: number, y: number, z: number): {
        chunks: {};
    };
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x: number, y: number, z: number, chunkSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
    getRegion(x: number, y: number, z: number): false | {
        palette?: WorldRegionPalette | undefined;
        chunks: Record<string, {
            voxels: Uint32Array;
            chunkStates: Uint8Array;
        }>;
    };
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(x: number, y: number, z: number): false | undefined;
    getChunk(x: number, y: number, z: number): false | {
        voxels: Uint32Array;
        chunkStates: Uint8Array;
    };
    isChunkLocked(x: number, y: number, z: number): boolean;
    lockChunk(x: number, y: number, z: number): boolean;
    unLockChunk(x: number, y: number, z: number): boolean;
    updateChunkData(chunkX: number, chunkY: number, chunkZ: number, run: (chunk: {
        voxels: Uint32Array;
        chunkStates: Uint8Array;
    }) => {}): false | Promise<boolean>;
    setData(x: number, y: number, z: number, data: number): false | undefined;
    getData(x: number, y: number, z: number): number;
    getVoxelNumberID(x: number, y: number, z: number): number | false;
};
