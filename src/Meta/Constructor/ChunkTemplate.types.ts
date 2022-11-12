import { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types";
export type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    overlayUVTemplate: number[];
    shapeTemplate: number[];
    shapeStateTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
    colorTemplate: number[];
    flowTemplate?: number[];
   };
export type FullChunkTemplate = Record<VoxelTemplateSubstanceType, ChunkTemplate>;
