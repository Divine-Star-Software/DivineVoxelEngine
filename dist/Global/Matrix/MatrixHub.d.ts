import type { WorldMatrix } from "./WorldMatrix";
/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export declare class MatrixHub {
    private worldMatrix;
    constructor(worldMatrix: WorldMatrix);
    onMessage(data: any[], runAfter: (data: any) => {}): void;
    _syncChunk(data: any[]): void;
    _releaseChunk(data: any[]): void;
    _syncGlobalVoxelPalette(data: any[]): void;
    _syncRegionVoxelPalette(data: any[]): void;
    _releaseRegionVoxelPalette(data: any[]): void;
}
