import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export type ChunkTemplate = {
 positionTemplate: number[];
 faceTemplate: number[];
 uvTemplate: number[];
 shapeTemplate: number[];
 shapeStateTemplate: number[];
 lightTemplate: number[];
 aoTemplate: number[];
 colorTemplate: number[];
};

export type ChunkVoxels = number[] | Uint32Array;

export type ChunkData = {
 proto: boolean;
 voxelsSAB: SharedArrayBuffer;
 voxels: Uint32Array;
 maxMinHeight: number[];
 heightMap: number[][];
 isEmpty: boolean;
 position: number[];
};
export type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
