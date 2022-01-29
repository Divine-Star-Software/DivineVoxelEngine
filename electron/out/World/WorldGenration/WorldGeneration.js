import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteHelper } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration {
    DVEW;
    globalVoxelPaletteIndex = 1;
    perChunkVoxelRecord = {};
    globalVoxelPalette = {};
    globalVoxelPaletteMap = {};
    globalVoxelPaletteRecord = {};
    chunkDataHelper;
    illumantionManager;
    voxelPaletteHelper = new VoxelPaletteHelper(this);
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.illumantionManager = new IlluminationManager(this.DVEW);
        this.chunkDataHelper = new ChunkDataHelper(this.DVEW);
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
        const defaultId = `${voxel.data.id}:default`;
        this.globalVoxelPalette[this.globalVoxelPaletteIndex] = defaultId;
        this.globalVoxelPaletteMap[`${voxel.data.id}:default`] =
            this.globalVoxelPaletteIndex;
        this.globalVoxelPaletteIndex++;
        this.globalVoxelPaletteRecord[defaultId] = [voxel.data.id, "default"];
        if (voxel.data.states) {
            for (const state of voxel.data.states) {
                const stateID = `${voxel.data.id}:${state}`;
                this.globalVoxelPalette[this.globalVoxelPaletteIndex] = stateID;
                this.globalVoxelPaletteRecord[stateID] = [voxel.data.id, state];
                this.globalVoxelPaletteMap[`${voxel.data.id}:${state}`] =
                    this.globalVoxelPaletteIndex;
                this.globalVoxelPaletteIndex++;
            }
        }
    }
    registerVoxelForPerChunkVoxelPalette(voxel) {
        const defaultId = `${voxel.data.id}:default`;
        this.perChunkVoxelRecord[defaultId] = [voxel.data.id, "default"];
        if (voxel.data.states) {
            for (const state of voxel.data.states) {
                const stateID = `${voxel.data.id}:${state}`;
                this.perChunkVoxelRecord[stateID] = [voxel.data.id, state];
            }
        }
    }
    getGlobalVoxelPalette() {
        return this.globalVoxelPalette;
    }
    getBlankChunk(empty = true, palette = false, voxels = []) {
        let paletteData = {};
        if (palette) {
            paletteData = {
                count: 0,
                map: {},
                record: {},
            };
        }
        return {
            ...{
                voxels: voxels,
                maxMinHeight: [],
                heightMap: [],
                isEmpty: empty,
                ...paletteData,
            },
        };
    }
}
