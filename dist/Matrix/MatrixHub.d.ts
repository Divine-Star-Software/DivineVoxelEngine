import { InterCommPortTypes } from "Meta/Comms/InterComm.types.js";
/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export declare const MatrixHub: {
    messageFunctions: Record<string, (data: any, event: MessageEvent) => any | void>;
    worldPort: InterCommPortTypes | undefined;
    threadName: string;
    setThreadName(threadName: string): void;
    onMessage(event: MessageEvent, runAfter: (event: MessageEvent) => any | void): void;
    requestChunkSync(chunkX: number, chunkY: number, chunkZ: number): Promise<unknown>;
    requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number): void;
    _setWorldPort(port: MessagePort): void;
    _syncChunk(data: any[]): void;
    _releaseChunk(data: any[]): void;
    _syncGlobalVoxelPalette(data: any[]): void;
    _syncRegionData(data: any[]): void;
    _releaseRegionVoxelPalette(data: any[]): void;
    _setThreadName(data: any[]): void;
};
