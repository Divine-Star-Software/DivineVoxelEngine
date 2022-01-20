import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
export declare type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
};
export declare type ChunkVoxels = any[][][];
export declare type ChunkData = {
    voxelPallet?: VoxelPallet;
    voxels: ChunkVoxels;
    maxMinHeight: number[];
    heightMap: number[][];
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
