import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export declare class Matrix {
    private DVEW;
    loadedChunks: Record<string, SharedArrayBuffer>;
    chunkStatesSAB: Record<string, SharedArrayBuffer>;
    chunkStates: Record<string, Uint8Array>;
    constructor(DVEW: DivineVoxelEngineWorld);
    isChunkInMatrix(chunkX: number, chunkY: number, chunkZ: number): boolean;
    isChunkLocked(chunkX: number, chunkY: number, chunkZ: number): boolean;
    lockChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    unLockChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    updateChunkData(chunkX: number, chunkY: number, chunkZ: number, run: (chunk: ChunkData) => {}): false | Promise<boolean>;
    releaseChunk(chunkX: number, chunkY: number, chunkZ: number): boolean | undefined;
    createChunkSAB(chunkX: number, chunkY: number, chunkZ: number): SharedArrayBuffer[] | false;
}
