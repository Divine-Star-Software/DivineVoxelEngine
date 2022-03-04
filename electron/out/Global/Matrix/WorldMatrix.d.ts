import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import { Flat3DArray } from "../Util/Flat3DArray.js";
import { ChunkBounds } from "../Chunks/ChunkBounds.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export declare class WorldMatrix implements ChunkBound {
    _3dArray: Flat3DArray;
    chunkBounds: ChunkBounds;
    chunks: Record<string, Uint32Array>;
    constructor();
    syncChunkBounds(): void;
    setChunk(chunkX: number, chunkY: number, chunkZ: number, data: Uint32Array): void;
    getChunk(chunkX: number, chunkY: number, chunkZ: number): false | Uint32Array;
    setData(x: number, y: number, z: number, data: number): false | undefined;
    getData(x: number, y: number, z: number, value: number): number | false;
}
