import type { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import type { ChunkData, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { WorldData } from "World/WorldData/WorldData.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare class ChunkProcessor {
    private DVEW;
    worldBottomY: number;
    worldTopY: number;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    voxelByte: VoxelByte;
    _3dArray: Flat3DArray;
    exposedFaces: number[];
    worldData: WorldData;
    constructor(DVEW: DivineVoxelEngineWorld);
    syncChunkBounds(): void;
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplatesAsync(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): Promise<FullChunkTemplate>;
    makeAllChunkTemplates(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
}
