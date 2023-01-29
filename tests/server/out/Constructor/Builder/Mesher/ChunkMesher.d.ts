import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { FullVoxelSubstanceTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const ChunkMesher: {
    voxelBuildOrder: VoxelTemplateSubstanceType[];
    buildChunkMesh(location: LocationData, template: FullVoxelSubstanceTemplate, LOD?: number): void;
};
