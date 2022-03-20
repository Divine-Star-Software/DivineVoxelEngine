/**# Chunk Manager
 * ---
 * Manages operations and data related to chunks.
 */
export class ChunkManager {
    chunkXPow2 = 4;
    chunkYPow2 = 7;
    chunkZPow2 = 4;
    chunkXSize = 4;
    chunkYSize = 4;
    chunkZSize = 7;
    setChunkSize(pow2X, pow2Y, pow2Z) {
        this.chunkXPow2 = pow2X;
        this.chunkXSize = Math.pow(2, pow2X);
        this.chunkYPow2 = pow2Y;
        this.chunkYSize = Math.pow(2, pow2Y);
        this.chunkZPow2 = pow2Z;
        this.chunkZSize = Math.pow(2, pow2Z);
    }
}
