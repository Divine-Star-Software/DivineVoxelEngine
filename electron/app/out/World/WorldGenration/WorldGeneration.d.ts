import { VoxelByte } from "Global/Util/VoxelByte.js";
import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteHelper as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare class WorldGeneration {
    DVEW: DivineVoxelEngineWorld;
    chunkDataHelper: ChunkDataHelper;
    illumantionManager: IlluminationManager;
    voxelPalette: VoxelPaletteManager;
    voxelByte: VoxelByte;
    constructor(DVEW: DivineVoxelEngineWorld);
    paintVoxel(voxelPalletId: number): number;
    getBlankChunk(empty?: boolean, palette?: boolean, voxels?: number[][][]): ChunkData;
}
