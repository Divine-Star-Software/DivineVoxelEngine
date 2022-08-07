/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export const VoxelPaletteManager = {
    voxelPaletteCount: 2,
    voxelPalette: {},
    voxelPaletteMap: {},
    voxelPaletteRecord: {},
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteId(voxelId, voxelState) {
        return this.voxelPaletteMap[`${voxelId}:${voxelState}`];
    },
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelData(voxelId) {
        const id = this.voxelPalette[voxelId];
        return this.voxelPaletteRecord[id];
    },
    registerVoxel(voxel) {
        this._register(voxel.id, "default");
        if (voxel.states) {
            for (const state of voxel.states) {
                this._register(voxel.id, state);
            }
        }
    },
    _register(id, stateId) {
        const newId = `${id}:${stateId}`;
        this.voxelPalette[this.voxelPaletteCount] = newId;
        this.voxelPaletteMap[newId] = this.voxelPaletteCount;
        this.voxelPaletteRecord[newId] = [id, stateId];
        this.voxelPaletteCount++;
    },
    getVoxelPartentId(id) {
        const mainData = this.getVoxelData(id);
        return this.getVoxelPaletteId(mainData[0], "default");
    },
    isVoxelIdAState(id) {
        const mainData = this.getVoxelData(id);
        return mainData[0] != "default";
    },
    getVoxelPalette() {
        return this.voxelPalette;
    },
    getVoxelPaletteMap() {
        return this.voxelPaletteMap;
    },
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getVoxelPaletteRecord() {
        return this.voxelPaletteRecord;
    },
};
