import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
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
    voxelsSAB: SharedArrayBuffer;
    voxels: Uint32Array;
    voxelsStatesSAB: SharedArrayBuffer;
    voxelsStates: Uint32Array;
    heightMapSAB: SharedArrayBuffer;
    heightMap: Uint32Array;
    isEmpty: boolean;
    position: number[];
};
export declare type FullChunkTemplate = Record<VoxelSubstanceType, ChunkTemplate>;
