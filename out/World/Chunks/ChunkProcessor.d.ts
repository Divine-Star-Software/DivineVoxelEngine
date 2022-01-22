import type { ChunkData, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import type { VoxelPallet } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { WorldData } from "World/WorldData/WorldData.js";
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
    /**## substance rules
     * ---
     * defines substance interactions for face culling/adding.
     * First is the voxel being tested. The second are its neighbors
     */
    substanceRules: Record<string, boolean>;
    exposedFaces: number[];
    constructor(DVEW: DivineVoxelEngineWorld);
    worldData: WorldData;
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(chunk: ChunkData, voxelPallet: VoxelPallet, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
}
