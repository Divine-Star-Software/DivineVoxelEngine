/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk.
 */
export class WorldGeneration {
    globalVoxelPalletIndex = 1;
    globalVoxelPallet = {};
    globalVoxelPalletMap = {};
    getVoxelIdFromGlobalPallet(id) {
        return this.globalVoxelPalletMap[id];
    }
    addToGlobalVoxelPallet(id, voxleStateData) {
        this.globalVoxelPallet[this.globalVoxelPalletIndex] = voxleStateData;
        this.globalVoxelPalletMap[id] = this.globalVoxelPalletIndex;
        this.globalVoxelPalletIndex++;
    }
    getGlobalVoxelPallet() {
        return this.globalVoxelPallet;
    }
}
