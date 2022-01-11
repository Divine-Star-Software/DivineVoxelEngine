export class ChunkMap {
    chunks = {};
    /**# Delete Chunk
     * ---
     * Clear the chunk data and reuse it.
     */
    deleteChunk(chunkX, chunkZ) {
    }
    addChunk(chunkX, chunkZ) {
        this.chunks[`${chunkX}-${chunkZ}`] = {};
    }
    getChunk(chunkX, chunkZ) {
        return this.chunks[`${chunkX}-${chunkZ}`];
    }
    blockExists(chunkX, chunkZ, x, y, z) {
        return true;
    }
}
