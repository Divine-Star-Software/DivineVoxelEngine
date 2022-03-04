/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export declare class MatrixHub {
    syncChunk(message: any[]): void;
    releaseChunk(message: any[]): void;
}
