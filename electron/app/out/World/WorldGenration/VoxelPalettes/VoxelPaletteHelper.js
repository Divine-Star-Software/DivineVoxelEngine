/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export const VoxelPaletteManager = {
    globalVoxelPaletteIndex: 2,
    globalVoxelPalette: {},
    globalVoxelPaletteMap: {},
    globalVoxelPaletteRecord: {},
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteIdFromGlobalPalette(voxelId, voxelState) {
        return this.globalVoxelPaletteMap[`${voxelId}:${voxelState}`];
    },
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelDataFromGlobalPalette(voxelId) {
        const id = this.globalVoxelPalette[voxelId];
        return this.globalVoxelPaletteRecord[id];
    },
    registerVoxelForGlobalPalette(voxel) {
        const defaultId = `${voxel.id}:default`;
        this.globalVoxelPalette[this.globalVoxelPaletteIndex] = defaultId;
        this.globalVoxelPaletteMap[`${voxel.id}:default`] =
            this.globalVoxelPaletteIndex;
        this.globalVoxelPaletteIndex++;
        this.globalVoxelPaletteRecord[defaultId] = [voxel.id, "default"];
        if (voxel.states) {
            for (const state of voxel.states) {
                const stateID = `${voxel.id}:${state}`;
                this.globalVoxelPalette[this.globalVoxelPaletteIndex] = stateID;
                this.globalVoxelPaletteRecord[stateID] = [voxel.id, state];
                this.globalVoxelPaletteMap[`${voxel.id}:${state}`] =
                    this.globalVoxelPaletteIndex;
                this.globalVoxelPaletteIndex++;
            }
        }
    },
    getGlobalVoxelPalette() {
        return this.globalVoxelPalette;
    },
    getGlobalVoxelPaletteMap() {
        return this.globalVoxelPaletteMap;
    },
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getGlobalVoxelPaletteRecord() {
        return this.globalVoxelPaletteRecord;
    },
};
