/**# Chunk Bounds Manager
 * ---
 * This only holds the data for the size of chunks.
 */
export class ChunkBoundsManager {
    chunkXPow2 = 4;
    chunkYPow2 = 7;
    chunkZPow2 = 4;
    chunkXSize = 16;
    chunkYSize = 256;
    chunkZSize = 16;
    chunkTotalVoxels = 16 * 256 * 16;
    setChunkSize(pow2X, pow2Y, pow2Z) {
        this.chunkXPow2 = pow2X;
        this.chunkXSize = Math.pow(2, pow2X);
        this.chunkYPow2 = pow2Y;
        this.chunkYSize = Math.pow(2, pow2Y);
        this.chunkZPow2 = pow2Z;
        this.chunkZSize = Math.pow(2, pow2Z);
    }
}
