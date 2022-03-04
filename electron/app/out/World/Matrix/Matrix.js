/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export class Matrix {
    DVEW;
    loadedChunks = {};
    chunkBounds;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    releaseChunk(chunkX, chunkY, chunkZ) {
        if (!this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`])
            return;
        const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        const voxels = [];
        const length = chunk.voxels.length;
        const chunkSABView = chunk.voxels;
        let i = length;
        while (i--) {
            voxels[i] = chunkSABView[i];
        }
        chunk.voxels = voxels;
        delete this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`];
        return true;
    }
    createChunkSAB(chunkX, chunkY, chunkZ) {
        const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        const length = chunk.voxels.length;
        const chunkSAB = new SharedArrayBuffer(length * 4);
        const chunkSABView = new Uint32Array(chunkSAB);
        let i = length;
        while (i--) {
            chunkSABView[i] = chunk.voxels[i];
        }
        this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunkSAB;
        chunk.voxels = chunkSABView;
        return chunkSAB;
    }
}
