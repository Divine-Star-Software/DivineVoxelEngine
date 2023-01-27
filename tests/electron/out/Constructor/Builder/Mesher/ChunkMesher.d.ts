import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const ChunkMesher: {
    voxelBuildOrder: VoxelTemplateSubstanceType[];
    buildChunkMesh(location: LocationData, template: FullChunkTemplate, LOD?: number): void;
};
