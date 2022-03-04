import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
import { VoxelPalette } from "Meta/WorldData/World.types";
export type ChunkTemplate = {
 positionTemplate: number[];
 faceTemplate: number[];
 uvTemplate: number[];
 shapeTemplate: number[];
 shapeStateTemplate : number[];
 lightTemplate: number[];
 aoTemplate: number[];
 colorTemplate: number[];
};

export type ChunkVoxels = number[] | Uint32Array;

export type ChunkData = {
 palette?: {
  count : number;
  record: Record<number, string>;
  map: Record<string, number>;
 };
 proto : boolean,
 voxels: ChunkVoxels;
 maxMinHeight: number[];
 heightMap: number[][];
 isEmpty: boolean;
};
export type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
