//objects
import { Util } from "../../Global/Util.helper.js";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export const WorldGeneration = {
    chunkDataHelper: ChunkDataHelper,
    illumantionManager: IlluminationManager,
    voxelPalette: VoxelPaletteManager,
    worldBounds: Util.getWorldBounds(),
    voxelByte: Util.getVoxelByte(),
    paintVoxel(voxelPalletId) {
        return this.voxelByte.setId(voxelPalletId, 0);
    },
    getBlankRegion(palette = false) {
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
                chunks: {},
                ...paletteData,
            },
        };
    },
    getBlankChunk(empty = true, palette = false, proto = true) {
        let paletteData = {};
        if (palette) {
            paletteData = {
                count: 0,
                map: {},
                record: {},
            };
        }
        const chunkSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
        const chunkVoxels = new Uint32Array(chunkSAB);
        return {
            ...{
                proto: proto,
                voxelsSAB: chunkSAB,
                voxels: chunkVoxels,
                maxMinHeight: [],
                heightMap: [],
                isEmpty: empty,
                ...paletteData,
            },
        };
    }
};
