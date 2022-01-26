import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration {
    DVEW;
    globalVoxelPaletteIndex = 1;
    globalVoxelPalette = {};
    globalVoxelPaletteMap = {};
    illumantionManager;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.illumantionManager = new IlluminationManager(this.DVEW);
    }
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
