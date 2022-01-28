import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
    colorTemplate: number[];
};
export declare type ChunkVoxels = any[][][];
export declare type ChunkData = {
    palette?: {
        count: number;
        record: Record<number, string>;
        map: Record<string, number>;
    };
    voxels: ChunkVoxels;
    maxMinHeight: number[];
    heightMap: number[][];
    isEmpty: boolean;
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
