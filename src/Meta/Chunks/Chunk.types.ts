import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
export type ChunkTemplate = {
 positionTemplate: number[];
 faceTemplate: number[];
 uvTemplate: number[];
 shapeTemplate: number[];
 RGBLightTemplate: number[];
 sunLightTemplate: number[];
 aoTemplate: number[];
};

export type ChunkVoxels = any[][][];

export type ChunkData = {
 voxelPallet?: VoxelPallet;
 voxels: ChunkVoxels;
 maxMinHeight : number[],
 heightMap : number[][],
 isEmpty : boolean
};
export type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
