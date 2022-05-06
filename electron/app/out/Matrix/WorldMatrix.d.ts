import { Flat3DArray } from "../Global/Util/Flat3DArray.js";
import { VoxelByte } from "../Global/Util/VoxelByte.js";
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
        syncBoundsWithFlat3DArray: (flat3dArray: Flat3DArray) => void;
        setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
        setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
    };
    voxelByte: VoxelByte;
    updateDieTime: number;
    loadDieTime: number;
    regionXPow2: number;
    regionZPow2: number;
    regionYPow2: number;
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
    __setRegionVoxelPalette(regionX: number, regionY: number, regionZ: number, palette: Record<number, string>): void;
    __removeRegionVoxelPalette(regionX: number, regionY: number, regionZ: number): false | undefined;
    getVoxel(x: number, y: number, z: number): false | string[];
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(chunkX: number, chunkY: number, chunkZ: number, chunkSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
    getChunk(chunkX: number, chunkY: number, chunkZ: number): false | Uint32Array;
    isChunkLocked(chunkX: number, chunkY: number, chunkZ: number): boolean;
    lockChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    unLockChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    updateChunkData(chunkX: number, chunkY: number, chunkZ: number, run: (chunk: Uint32Array) => {}): false | Promise<boolean>;
    setData(x: number, y: number, z: number, data: number): false | undefined;
    getData(x: number, y: number, z: number): number;
    getVoxelNumberID(x: number, y: number, z: number): number;
}
