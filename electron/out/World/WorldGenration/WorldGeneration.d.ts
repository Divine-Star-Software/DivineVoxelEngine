import { ChunkData } from "Meta/Chunks/Chunk.types";
import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import type { VoxelPalette } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteHelper } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare class WorldGeneration {
    DVEW: DivineVoxelEngineWorld;
    globalVoxelPaletteIndex: number;
    perChunkVoxelRecord: Record<string, string[]>;
    globalVoxelPalette: VoxelPalette;
    globalVoxelPaletteMap: Record<string, number>;
    globalVoxelPaletteRecord: Record<string, string[]>;
    chunkDataHelper: ChunkDataHelper;
    illumantionManager: IlluminationManager;
    voxelPaletteHelper: VoxelPaletteHelper;
    constructor(DVEW: DivineVoxelEngineWorld);
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     * @param voxelTrueId
     * @param voxelStateId
     * @returns
     */
    getVoxelIdFromGlobalPalette(voxelTrueId: string, voxelStateId: string): number;
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     * @param voxelId
     * @param voxelStateId
     * @returns
     */
    getVoxelDataFromGlobalPalette(voxelId: number): string[];
    registerVoxelForGlobalPalette(voxel: VoxelInteface): void;
    registerVoxelForPerChunkVoxelPalette(voxel: VoxelInteface): void;
    getGlobalVoxelPalette(): VoxelPalette;
    getBlankChunk(empty?: boolean, palette?: boolean, voxels?: number[][][]): ChunkData;
}
