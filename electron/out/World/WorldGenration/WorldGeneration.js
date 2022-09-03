//objects
import { Util } from "../../Global/Util.helper.js";
import { VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export const WorldGeneration = {
    heightByte: Util.getHeightByte(),
    chunkReader: Util.getChunkReader(),
    voxelPalette: VoxelPaletteManager,
    getBlankRegion() {
        return {
            chunks: {},
        };
    },
    createChunkFromDataThread(data) {
        return {
            buffer: data[0],
            data: new DataView(data[0]),
        };
    },
    getBlankChunk(empty = true, proto = true) {
        const chunkSAB = new SharedArrayBuffer(this.chunkReader.chunkByteSize);
        const data = new DataView(chunkSAB);
        this.heightByte.initalizeChunk(data);
        return {
            buffer: chunkSAB,
            data: data,
        };
    },
};
