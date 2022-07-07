import type { InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export declare const MatrixCentralHub: {
    threads: Record<string, InterCommPortTypes>;
    _threadMessageFunctions: Record<string, (data: any, event: MessageEvent) => void>;
    registerThread(threadId: string, thread: InterCommPortTypes): void;
    syncChunk(x: number, y: number, z: number): false | undefined;
    syncChunkInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    releaseChunk(x: number, y: number, z: number): void;
    releaseChunkInThread(threadId: string, x: number, y: number, z: number): void;
    syncRegion(x: number, y: number, z: number): false | undefined;
    syncRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    releaseRegion(x: number, y: number, z: number): false | undefined;
    releaseRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    syncGlobalVoxelPalette(): void;
    syncGlobalVoxelPaletteInThread(threadId: string): void;
};
