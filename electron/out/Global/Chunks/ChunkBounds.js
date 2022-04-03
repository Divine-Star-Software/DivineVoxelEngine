/**# Chunk Bounds
 * ---
 * This only holds the data for the size of chunks.
 * A refernce is held to all classes that need it.
 */
export class ChunkBounds {
    chunkXPow2 = 4;
    chunkYPow2 = 7;
    chunkZPow2 = 4;
    chunkXSize = 16;
    chunkYSize = 128;
    chunkZSize = 16;
    chunkTotalVoxels = 16 * 128 * 16;
    syncBoundsWithFlat3DArray(flat3dArray) {
        flat3dArray.setBounds(this.chunkXSize, this.chunkYSize, this.chunkZSize);
    }
    setChunkBounds(pow2X, pow2Y, pow2Z) {
        this.chunkXPow2 = pow2X;
        this.chunkXSize = 2 ** pow2X;
        this.chunkYPow2 = pow2Y;
        this.chunkYSize = 2 ** pow2Y;
        this.chunkZPow2 = pow2Z;
        this.chunkZSize = 2 ** pow2Z;
        this.chunkTotalVoxels = this.chunkXSize * this.chunkYSize * this.chunkZSize;
    }
}
