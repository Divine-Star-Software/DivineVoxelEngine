import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare type ChunkTemplate = {
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
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
