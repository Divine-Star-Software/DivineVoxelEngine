import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
