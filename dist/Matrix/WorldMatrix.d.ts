import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import { Flat3DArray } from "../Global/Util/Flat3DArray.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { VoxelByte } from "../Global/Util/VoxelByte.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export declare class WorldMatrix implements ChunkBound {
    _3dArray: Flat3DArray;
    chunkBounds: ChunkBounds;
    voxelByte: VoxelByte;
    updateDieTime: number;
    loadDieTime: number;
    regionXPow2: number;
    regionZPow2: number;
    regionYPow2: number;
    chunks: Record<string, Uint32Array>;
    chunkStates: Record<string, Uint8Array>;
    paletteMode: number;
    globalVoxelPalette: Record<number, string[]>;
    regionVoxelPalettes: Record<string, Record<number, string[]>>;
    constructor();
    syncChunkBounds(): void;
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(chunkX: number, chunkY: number, chunkZ: number, timeout?: number): Promise<unknown>;
    __setGlobalVoxelPalette(palette: Record<number, string[]>): void;
    __setRegionVoxelPalette(regionX: number, regionY: number, regionZ: number, palette: Record<number, string[]>): void;
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
