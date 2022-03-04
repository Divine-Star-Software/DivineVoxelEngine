import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import type { ChunkBounds } from "Global/Chunks/ChunkBounds";
/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export declare class Matrix {
    private DVEW;
    loadedChunks: Record<string, SharedArrayBuffer>;
    chunkBounds: ChunkBounds;
    constructor(DVEW: DivineVoxelEngineWorld);
    releaseChunk(chunkX: number, chunkY: number, chunkZ: number): boolean | undefined;
    createChunkSAB(chunkX: number, chunkY: number, chunkZ: number): false | SharedArrayBuffer;
}
