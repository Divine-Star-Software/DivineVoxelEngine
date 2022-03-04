import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export declare class MatrixThreadCentralHub {
    private DVEW;
    threads: Record<string, Worker | MessagePort>;
    constructor(DVEW: DivineVoxelEngineWorld);
    registerThread(threadId: string, thread: Worker | MessagePort): void;
    syncChunk(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
    syncChunkInThread(threadId: string, chunkX: number, chunkY: number, chunkZ: number): false | undefined;
    releaseChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInThread(threadId: string, chunkX: number, chunkY: number, chunkZ: number): void;
}
