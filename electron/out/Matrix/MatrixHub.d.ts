import type { WorldMatrix } from "./WorldMatrix";
/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export declare class MatrixHub {
    threadName: string;
    private worldMatrix;
    messageFunctions: Record<string, (data: any) => any | void>;
    worldPort: MessagePort;
    constructor(threadName: string, worldMatrix: WorldMatrix);
    onMessage(data: any[], runAfter: (data: any) => any | void): void;
    requestChunkSync(chunkX: number, chunkY: number, chunkZ: number): void;
    requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number): void;
    _setWorldPort(port: MessagePort): void;
    _syncChunk(data: any[]): void;
    _releaseChunk(data: any[]): void;
    _syncGlobalVoxelPalette(data: any[]): void;
    _syncRegionVoxelPalette(data: any[]): void;
    _releaseRegionVoxelPalette(data: any[]): void;
}
