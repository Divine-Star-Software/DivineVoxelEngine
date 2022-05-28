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
    worldBounds: Util.getWorldBounds(),
    voxelByte: Util.getVoxelByte(),
    heightByte: Util.getHeightByte(),
    chunkDataHelper: ChunkDataHelper,
    illumantionManager: IlluminationManager,
    voxelPalette: VoxelPaletteManager,
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
            chunks: {},
            ...paletteData,
        };
    },
    getBlankChunk(empty = true, proto = true) {
        const chunkSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
        const chunkVoxels = new Uint32Array(chunkSAB);
        const chunkStatesSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
        const chunkStatesVoxels = new Uint32Array(chunkSAB);
        const heightMapSAB = new SharedArrayBuffer(this.worldBounds.chunkArea * 4 * 2);
        const heightMap = new Uint32Array(heightMapSAB);
        let i = heightMap.length;
        let startingValue = this.heightByte.getStartingHeightMapValue();
        while (i--) {
            heightMap[i] = startingValue;
        }
        return {
            proto: proto,
            voxelsSAB: chunkSAB,
            voxels: chunkVoxels,
            voxelsStatesSAB: chunkStatesSAB,
            voxelsStates: chunkStatesVoxels,
            heightMapSAB: heightMapSAB,
            heightMap: heightMap,
            isEmpty: empty,
            position: [],
        };
    },
};
