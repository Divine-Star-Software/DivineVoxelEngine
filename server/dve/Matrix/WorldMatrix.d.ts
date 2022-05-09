import { WorldRegionPalette } from "Meta/WorldData/World.types.js";
import { Flat3DArray } from "../Global/Util/Flat3DArray.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export declare class WorldMatrix {
    _3dArray: Flat3DArray;
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
        syncBoundsWithFlat3DArray: (flat3dArray: Flat3DArray) => void;
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
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    updateDieTime: number;
    loadDieTime: number;
    regionXPow2: number;
    regionZPow2: number;
    regionYPow2: number;
    regions: Record<string, {
        palette?: WorldRegionPalette;
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
    constructor();
    syncChunkBounds(): void;
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(chunkX: number, chunkY: number, chunkZ: number, timeout?: number): Promise<unknown>;
    __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>): void;
    __syncRegionData(x: number, y: number, z: number, palette: WorldRegionPalette): void;
    __removeRegionVoxelPalette(regionX: number, regionY: number, regionZ: number): false | undefined;
    getVoxel(x: number, y: number, z: number): false | string[];
    _createRegion(x: number, y: number, z: number): {
        chunks: {};
    };
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x: number, y: number, z: number, chunkSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
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
}
