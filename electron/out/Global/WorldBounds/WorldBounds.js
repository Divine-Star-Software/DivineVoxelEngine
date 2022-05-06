/**# World Bounds
 * ---
 * This only holds the data for the size of chunks, regions, and the world.
 * A refernce is held to all classes that need it.
 */
export const WorldBounds = {
    chunkXPow2: 4,
    chunkYPow2: 7,
    chunkZPow2: 4,
    chunkXSize: 16,
    chunkYSize: 128,
    chunkZSize: 16,
    chunkTotalVoxels: 16 * 128 * 16,
    regionXPow2: 4,
    regionYPow2: 7,
    regionZPow2: 4,
    regionXSize: 16,
    regionYSize: 128,
    regionZSize: 16,
    regionTotalChunks: 16 * 128 * 16,
    syncBoundsWithFlat3DArray: function (flat3dArray) {
        flat3dArray.setBounds(this.chunkXSize, this.chunkYSize, this.chunkZSize);
    },
    setChunkBounds: function (pow2X, pow2Y, pow2Z) {
        this.chunkXPow2 = pow2X;
        this.chunkXSize = 2 ** pow2X;
        this.chunkYPow2 = pow2Y;
        this.chunkYSize = 2 ** pow2Y;
        this.chunkZPow2 = pow2Z;
        this.chunkZSize = 2 ** pow2Z;
        this.chunkTotalVoxels = this.chunkXSize * this.chunkYSize * this.chunkZSize;
    },
    setRegionBounds: function (pow2X, pow2Y, pow2Z) {
        this.regionXPow2 = pow2X;
        this.regionXSize = 2 ** pow2X;
        this.regionYPow2 = pow2Y;
        this.regionYSize = 2 ** pow2Y;
        this.regionZPow2 = pow2Z;
        this.regionZSize = 2 ** pow2Z;
        this.regionTotalChunks =
            this.regionXSize * this.regionYSize * this.regionZSize;
    },
};
