import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPalette } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare class WorldGeneration implements WorldGenerationInterface {
    DVEW: DivineVoxelEngineWorld;
    globalVoxelPaletteIndex: number;
    globalVoxelPalette: VoxelPalette;
    globalVoxelPaletteMap: Record<string, number>;
    chunkDataHelper: ChunkDataHelper;
    illumantionManager: IlluminationManager;
    constructor(DVEW: DivineVoxelEngineWorld);
    getVoxelIdFromGlobalPalette(id: string): number;
    addToGlobalVoxelPalette(id: string, voxleStateData: any[]): void;
    getGlobalVoxelPalette(): VoxelPalette;
    getBlankChunk(empty?: boolean, voxels?: number[][][]): ChunkData;
}
