import type { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import { DivineVoxelEngineBuilder } from "index.js";
import { WorldMatrix } from "Matrix/WorldMatrix.js";
import type { ChunkData, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import type { ChunkBounds } from "../../Global/Chunks/ChunkBounds.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare class ChunkProcessor implements ChunkBound {
    private DVEB;
    worldBottomY: number;
    worldTopY: number;
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
    worldMatrix: WorldMatrix;
    chunkBounds: ChunkBounds;
    constructor(DVEB: DivineVoxelEngineBuilder);
    syncChunkBounds(): void;
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
}
