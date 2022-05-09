/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from per-region voxel palettes.
 */
export class VoxelPaletteManager {
    DVEW;
    globalVoxelPaletteIndex = 1;
    perRegionVoxelRecord = {};
    globalVoxelPalette = {};
    globalVoxelPaletteMap = {};
    globalVoxelPaletteRecord = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     * @param voxelTrueId
     * @param voxelStateId
     * @returns
     */
    getVoxelPaletteIdFromGlobalPalette(voxelTrueId, voxelStateId) {
        return this.globalVoxelPaletteMap[`${voxelTrueId}:${voxelStateId}`];
    }
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     * @param voxelId
     * @param voxelStateId
     * @returns
     */
    getVoxelDataFromGlobalPalette(voxelId) {
        const id = this.globalVoxelPalette[voxelId];
        return this.globalVoxelPaletteRecord[id];
    }
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
    }
    registerVoxelForPerRegionVoxelPalette(voxel) {
        const defaultId = `${voxel.id}:default`;
        this.perRegionVoxelRecord[defaultId] = [voxel.id, "default"];
        if (voxel.states) {
            for (const state of voxel.states) {
                const stateID = `${voxel.id}:${state}`;
                this.perRegionVoxelRecord[stateID] = [voxel.id, state];
            }
        }
    }
    getGlobalVoxelPalette() {
        return this.globalVoxelPalette;
    }
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getGlobalVoxelPaletteRecord() {
        return this.globalVoxelPaletteRecord;
    }
    getVoxelDataFromRegion(region, voxelId) {
        if (!region.palette)
            return false;
        const palette = region.palette;
        const stringId = palette.palette[voxelId];
        return palette.record[stringId];
    }
    getVoxelPaletteIdFromRegion(region, voxelId, voxelState) {
        if (!region.palette)
            return false;
        const palette = region.palette;
        return palette.map[`${voxelId}:${voxelState}`];
    }
    addToRegionsVoxelPalette(region, voxelId, voxelState) {
        if (!region.palette)
            return 0;
        const palette = region.palette;
        const id = `${voxelId}:${voxelState}`;
        palette.record[palette.count] = [id, voxelState];
        palette.map[id] = palette.count;
        palette.palette[palette.count] = id;
        palette.count++;
        return palette.count - 1;
    }
}
