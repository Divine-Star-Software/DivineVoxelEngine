import type { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldGeneration } from "../WorldGeneration";
/**# Voxel Palette Helper
 * ---
 * Used to help decode voxel ids and states from per-chunk voxel palettes.
 */
export declare class VoxelPaletteHelper {
    private worldGeneration;
    constructor(worldGeneration: WorldGeneration);
    getVoxelData(chunk: ChunkData, voxelId: number): string[] | false;
    getVoxelPaletteId(chunk: ChunkData, voxelId: string, voxelState: string): number | false;
    addToChunksVoxelPalette(chunk: ChunkData, voxelId: string, voxelState: string): boolean;
}
