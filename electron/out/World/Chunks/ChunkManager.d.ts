/**# Chunk Manager
 * ---
 * Manages operations and data related to chunks.
 */
export declare class ChunkManager {
    chunkXPow2: number;
    chunkYPow2: number;
    chunkZPow2: number;
    chunkXSize: number;
    chunkYSize: number;
    chunkZSize: number;
    setChunkSize(pow2X: number, pow2Y: number, pow2Z: number): void;
}
