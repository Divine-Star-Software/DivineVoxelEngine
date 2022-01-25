import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPalette } from "Meta/WorldData/World.types";
/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk.
 */
export declare class WorldGeneration implements WorldGenerationInterface {
    globalVoxelPaletteIndex: number;
    globalVoxelPalette: VoxelPalette;
    globalVoxelPaletteMap: Record<string, number>;
    getVoxelIdFromGlobalPalette(id: string): number;
    addToGlobalVoxelPalette(id: string, voxleStateData: any[]): void;
    getGlobalVoxelPalette(): VoxelPalette;
    getBlankChunk(empty?: boolean, voxels?: number[][][]): ChunkData;
}
