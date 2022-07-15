//objects
import { Util } from "../../Global/Util.helper.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export const WorldGeneration = {
    worldBounds: Util.getWorldBounds(),
    voxelByte: Util.getVoxelByte(),
    heightByte: Util.getHeightByte(),
    voxelPalette: VoxelPaletteManager,
    getBlankRegion() {
        return {
            chunks: {},
        };
    },
    createChunkFromDataThread(data) {
        const chunkX = data[1];
        const chunkY = data[2];
        const chunkZ = data[3];
        return {
            proto: 0,
            voxelsSAB: data[4],
            voxels: new Uint32Array(data[4]),
            voxelsStatesSAB: data[5],
            voxelsStates: new Uint32Array(data[5]),
            heightMapSAB: data[6],
            heightMap: new Uint32Array(data[6]),
            minMaxMapSAB: data[7],
            minMaxMap: new Uint32Array(data[7]),
            isEmpty: false,
            position: [chunkX, chunkY, chunkZ],
        };
    },
    getBlankChunk(empty = true, proto = true) {
        const chunkSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
        const chunkVoxels = new Uint32Array(chunkSAB);
        const chunkStatesSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
        const chunkStatesVoxels = new Uint32Array(chunkStatesSAB);
        const heightMapSAB = new SharedArrayBuffer(this.worldBounds.chunkArea * 4 * 2);
        const heightMap = new Uint32Array(heightMapSAB);
        let i = heightMap.length;
        let startingValue = this.heightByte.getStartingHeightMapValue();
        while (i--) {
            heightMap[i] = startingValue;
        }
        const minMaxMapSAB = new SharedArrayBuffer(4 * 2);
        const minMaxMap = new Uint32Array(minMaxMapSAB);
        return {
            proto: 0,
            voxelsSAB: chunkSAB,
            voxels: chunkVoxels,
            voxelsStatesSAB: chunkStatesSAB,
            voxelsStates: chunkStatesVoxels,
            heightMapSAB: heightMapSAB,
            heightMap: heightMap,
            minMaxMapSAB: minMaxMapSAB,
            minMaxMap: minMaxMap,
            isEmpty: empty,
            position: [],
        };
    },
};
