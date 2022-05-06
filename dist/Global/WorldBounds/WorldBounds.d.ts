import { Flat3DArray } from "Global/Util/Flat3DArray";
/**# World Bounds
 * ---
 * This only holds the data for the size of chunks, regions, and the world.
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
    syncBoundsWithFlat3DArray: (flat3dArray: Flat3DArray) => void;
    setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
    setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
};
