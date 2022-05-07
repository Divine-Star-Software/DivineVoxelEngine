import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration {
    DVEW;
    chunkDataHelper;
    illumantionManager;
    voxelPalette;
    voxelByte;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.illumantionManager = new IlluminationManager(this.DVEW);
        this.chunkDataHelper = new ChunkDataHelper(this.DVEW);
        this.voxelPalette = new VoxelPaletteManager(this.DVEW);
        this.voxelByte = this.DVEW.UTIL.getVoxelByte();
    }
    paintVoxel(voxelPalletId) {
        return this.voxelByte.setId(voxelPalletId, 0);
    }
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
    }
    getBlankChunk(empty = true, palette = false, proto = true) {
        let paletteData = {};
        if (palette) {
            paletteData = {
                count: 0,
                map: {},
                record: {},
            };
        }
        const chunkSAB = new SharedArrayBuffer(this.DVEW.worldBounds.chunkTotalVoxels * 4);
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
}
