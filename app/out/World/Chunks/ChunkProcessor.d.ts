import { VoxelPallet } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import { ChunkOcculsionCalcuation } from "./Functions/ChunkAO.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare class ChunkProcessor {
    private DVEW;
    worldBottomY: number;
    worldTopY: number;
    chunkOcculsionCalcuation: typeof ChunkOcculsionCalcuation;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    constructor(DVEW: DivineVoxelEngineWorld);
    makeChunkTemplate(chunkVoxels: any[][][], voxelPallet: VoxelPallet, chunkX: number, chunkZ: number): number[][];
}
