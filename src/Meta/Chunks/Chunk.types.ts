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
 proto: number;
 isEmpty: boolean;
 voxelsSAB: SharedArrayBuffer;
 voxels: Uint32Array;
 voxelsStatesSAB: SharedArrayBuffer;
 voxelsStates: Uint32Array;
 heightMapSAB : SharedArrayBuffer;
 heightMap: Uint32Array;
 minMaxMapSAB : SharedArrayBuffer;
 minMaxMap: Uint32Array;

 position: number[];
};
export type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
