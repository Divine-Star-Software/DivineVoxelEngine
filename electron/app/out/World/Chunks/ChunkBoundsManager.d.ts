/**# Chunk Bounds Manager
 * ---
 * This only holds the data for the size of chunks.
 */
export declare class ChunkBoundsManager {
    chunkXPow2: number;
    chunkYPow2: number;
    chunkZPow2: number;
    chunkXSize: number;
    chunkYSize: number;
    chunkZSize: number;
    chunkTotalVoxels: number;
    setChunkSize(pow2X: number, pow2Y: number, pow2Z: number): void;
}
