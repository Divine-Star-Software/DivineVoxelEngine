export interface ChunkMapInteface {
    chunks: Record<string, Record<string, number>>;
    /**# Delete Chunk
     * ---
     * Clear the chunk data and reuse it.
     */
    deleteChunk(chunkX: number, chunkZ: number): void;
    addChunk(chunkX: number, chunkZ: number): void;
    getChunk(chunkX: number, chunkZ: number): Record<string, number>;
    blockExists(chunkX: number, chunkZ: number, x: number, y: number, z: number): boolean;
}
