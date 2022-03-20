import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    shapeStateTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
    colorTemplate: number[];
};
export declare type ChunkVoxels = number[] | Uint32Array;
export declare type ChunkData = {
    proto: boolean;
    voxels: ChunkVoxels;
    maxMinHeight: number[];
    heightMap: number[][];
    isEmpty: boolean;
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
