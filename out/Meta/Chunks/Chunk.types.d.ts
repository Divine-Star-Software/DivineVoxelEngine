import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
export declare type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    RGBLightTemplate: number[];
    sunLightTemplate: number[];
    aoTemplate: number[];
};
export declare type ChunkVoxels = any[][][];
export declare type ChunkData = {
    voxelPallet?: VoxelPallet;
    voxels: ChunkVoxels;
    maxMinHeight: number[];
    heightMap: number[][];
    isEmpty: boolean;
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
