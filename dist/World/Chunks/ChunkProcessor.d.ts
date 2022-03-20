import type { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import type { ChunkData, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { WorldData } from "World/WorldData/WorldData.js";
import type { ChunkBounds } from "../../Global/Chunks/ChunkBounds.js";
import { ChunkOcculsionCalcuation } from "./Functions/ChunkAO.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare class ChunkProcessor implements ChunkBound {
    private DVEW;
    worldBottomY: number;
    worldTopY: number;
    chunkOcculsionCalcuation: typeof ChunkOcculsionCalcuation;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    voxelByte: VoxelByte;
    _3dArray: Flat3DArray;
    /**## substance rules
     * ---
     * defines substance interactions for face culling/adding.
     * First is the voxel being tested. The second are its neighbors
     */
    substanceRules: Record<string, boolean>;
    exposedFaces: number[];
    worldData: WorldData;
    chunkBounds: ChunkBounds;
    constructor(DVEW: DivineVoxelEngineWorld);
    syncChunkBounds(): void;
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplatesAsync(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): Promise<FullChunkTemplate>;
    makeAllChunkTemplates(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
}
