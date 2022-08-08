/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export const VoxelPaletteManager = {
    voxelPaletteCount: 2,
    voxelPalette: {},
    voxelPaletteMap: {},
    /**# Get Vooxel Numeric Id
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteId(voxelId, voxelState) {
        return this.voxelPaletteMap[voxelId] + voxelState;
    },
    /**# Get Voxel True Id
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelTrueId(voxelId) {
        return this.voxelPalette[voxelId];
    },
    registerVoxel(voxel) {
        this.voxelPalette[this.voxelPaletteCount] = voxel.id;
        this.voxelPaletteMap[voxel.id] = this.voxelPaletteCount;
        if (voxel.states) {
            for (let i = this.voxelPaletteCount; i <= this.voxelPaletteCount + voxel.states; i++) {
                this.voxelPalette[i] = voxel.id;
            }
            this.voxelPaletteCount += voxel.states;
        }
        this.voxelPaletteCount++;
    },
    getVoxelPartentId(id) {
        const mainData = this.getVoxelTrueId(id);
        return this.getVoxelPaletteId(mainData, 0);
    },
    getVoxelState(voxelId) {
        const trueId = this.voxelPalette[voxelId];
        const mapId = this.voxelPaletteMap[trueId];
        return voxelId - mapId;
    },
    getVoxelPalette() {
        return this.voxelPalette;
    },
    getVoxelPaletteMap() {
        return this.voxelPaletteMap;
    },
};
