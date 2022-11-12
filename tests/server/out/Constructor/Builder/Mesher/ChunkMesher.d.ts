import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
export declare const ChunkMesher: {
    voxelBuildOrder: VoxelTemplateSubstanceType[];
    buildChunkMesh(dimension: number, chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate, LOD?: number): void;
};
