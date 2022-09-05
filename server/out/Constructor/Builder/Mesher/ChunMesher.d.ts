import type { VoxelTemplateSubstanceType } from "Meta/index";
import { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
export declare const ChunkMesher: {
    voxelBuildOrder: VoxelTemplateSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        fluid: number;
        magma: number;
    };
    buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate, LOD?: number): void;
};
