/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk.
 */
export class WorldGeneration {
    globalVoxelPaletteIndex = 1;
    globalVoxelPalette = {};
    globalVoxelPaletteMap = {};
    getVoxelIdFromGlobalPalette(id) {
        return this.globalVoxelPaletteMap[id];
    }
    addToGlobalVoxelPalette(id, voxleStateData) {
        this.globalVoxelPalette[this.globalVoxelPaletteIndex] = voxleStateData;
        this.globalVoxelPaletteMap[id] = this.globalVoxelPaletteIndex;
        this.globalVoxelPaletteIndex++;
    }
    getGlobalVoxelPalette() {
        return this.globalVoxelPalette;
    }
    getBlankChunk(empty = true, voxels = []) {
        return { ...{
                voxels: voxels,
                maxMinHeight: [],
                heightMap: [],
                isEmpty: empty,
            } };
    }
}
