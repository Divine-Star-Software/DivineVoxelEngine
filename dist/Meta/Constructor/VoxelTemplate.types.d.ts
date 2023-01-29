import { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types";
export declare type VoxelTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    overlayUVTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
    colorTemplate: number[];
    flowTemplate?: number[];
};
export declare type FullVoxelSubstanceTemplate = Record<VoxelTemplateSubstanceType, VoxelTemplate>;
