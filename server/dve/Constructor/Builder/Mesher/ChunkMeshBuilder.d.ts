import type { FullChunkTemplate, VoxelTemplateSubstanceType } from "Meta/index";
export declare const ChunkMeshBuilder: {
    voxelBuildOrder: VoxelTemplateSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        fluid: number;
        magma: number;
    };
    buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
};
