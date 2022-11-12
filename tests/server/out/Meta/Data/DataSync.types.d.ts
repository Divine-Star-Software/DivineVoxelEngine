import { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";
export declare type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";
export declare type ChunkSyncData = [
    dimesnionId: number | string,
    x: number,
    y: number,
    z: number,
    Buffer: SharedArrayBuffer
];
export declare type ChunkUnSyncData = [
    dimensionId: number | string,
    x: number,
    y: number,
    z: number
];
export declare type VoxelPaletteSyncData = [
    voxelPalette: VoxelPalette,
    voxelPaletteMap: VoxelPaletteMap
];
export declare type VoxelDataSync = [
    voxelData: SharedArrayBuffer,
    voxelMapData: SharedArrayBuffer
];
