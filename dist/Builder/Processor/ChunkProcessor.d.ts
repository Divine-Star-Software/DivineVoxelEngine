import type { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import { DivineVoxelEngineBuilder } from "index.js";
import { WorldMatrix } from "Matrix/WorldMatrix.js";
import type { ChunkVoxels, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare class ChunkProcessor {
    private DVEB;
    worldBottomY: number;
    worldTopY: number;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    voxelByte: VoxelByte;
    _3dArray: Flat3DArray;
    exposedFaces: number[];
    worldMatrix: WorldMatrix;
    constructor(DVEB: DivineVoxelEngineBuilder);
    syncChunkBounds(): void;
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(voxels: ChunkVoxels, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
}
