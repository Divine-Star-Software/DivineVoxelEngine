import { VoxelByte } from "Global/Util/VoxelByte.js";
import { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldRegion } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare class WorldGeneration {
    DVEW: DivineVoxelEngineWorld;
    chunkDataHelper: ChunkDataHelper;
    illumantionManager: IlluminationManager;
    voxelPalette: VoxelPaletteManager;
    voxelByte: typeof VoxelByte;
    constructor(DVEW: DivineVoxelEngineWorld);
    paintVoxel(voxelPalletId: number): number;
    getBlankRegion(palette?: boolean): WorldRegion;
    getBlankChunk(empty?: boolean, palette?: boolean, proto?: boolean): ChunkData;
}
