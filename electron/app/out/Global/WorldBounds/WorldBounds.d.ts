import type { Flat3DArray } from "Global/Util/Flat3DArray";
import { PositionMatrix } from "Meta/Util.types";
/**# World Bounds
 * ---
 * This holds the data for the size of chunks, regions, and the world.
 * It also handles the calcuation of chunks, regions, and relative voxel positions.
 * A refernce is held to all classes that need it.
 */
export declare const WorldBounds: {
    chunkXPow2: number;
    chunkYPow2: number;
    chunkZPow2: number;
    chunkXSize: number;
    chunkYSize: number;
    chunkZSize: number;
    chunkTotalVoxels: number;
    regionXPow2: number;
    regionYPow2: number;
    regionZPow2: number;
    regionXSize: number;
    regionYSize: number;
    regionZSize: number;
    regionTotalChunks: number;
    __regionPosition: {
        x: number;
        y: number;
        z: number;
    };
    __chunkPosition: {
        x: number;
        y: number;
        z: number;
    };
    __voxelPosition: {
        x: number;
        y: number;
        z: number;
    };
    syncBoundsWithFlat3DArray: (flat3dArray: typeof Flat3DArray) => void;
    setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
    setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
    getRegionPosition: (x: number, y: number, z: number) => {
        x: number;
        y: number;
        z: number;
    };
    getChunkPosition: (x: number, y: number, z: number) => {
        x: number;
        y: number;
        z: number;
    };
    getChunkKey: (chunkPOS: PositionMatrix) => string;
    getRegionKey: (regionPOS: PositionMatrix) => string;
    /**# Get Voxel Positions
     * ---
     * Returns the x/y/z index of the voxel in the chunk.
     * Used to find actual index in the chunk array.
     */
    getVoxelPosition: (x: number, y: number, z: number, chunkPOS: PositionMatrix) => {
        x: number;
        y: number;
        z: number;
    };
};
