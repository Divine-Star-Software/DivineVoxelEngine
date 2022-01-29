/**# Voxel Palette Helper
 * ---
 * Used to help decode voxel ids and states from per-chunk voxel palettes.
 */
export class VoxelPaletteHelper {
    worldGeneration;
    constructor(worldGeneration) {
        this.worldGeneration = worldGeneration;
    }
    getVoxelData(chunk, voxelId) {
        if (!chunk.palette)
            return false;
        const palette = chunk.palette;
        const id = palette.record[voxelId];
        return this.worldGeneration.perChunkVoxelRecord[id];
    }
    getVoxelPaletteId(chunk, voxelId, voxelState) {
        if (!chunk.palette)
            return false;
        const palette = chunk.palette;
        return palette.map[`${voxelId}:${voxelState}`];
    }
    addToChunksVoxelPalette(chunk, voxelId, voxelState) {
        if (!chunk.palette)
            return 0;
        const palette = chunk.palette;
        const id = `${voxelId}:${voxelState}`;
        palette.record[palette.count] = id;
        palette.map[id] = palette.count;
        palette.count++;
        return palette.count - 1;
    }
}
