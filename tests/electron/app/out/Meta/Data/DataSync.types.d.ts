import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types";
import type { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";
export declare type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";
export declare type ChunkSyncData = [
    dimesnionId: string,
    x: number,
    y: number,
    z: number,
    buffer: SharedArrayBuffer
];
export declare type ChunkUnSyncData = [
    dimensionId: string,
    x: number,
    y: number,
    z: number
];
export declare type ColumnSyncData = [
    dimesnionId: string,
    x: number,
    y: number,
    z: number,
    buffer: SharedArrayBuffer
];
export declare type ColumnUnSyncData = [
    dimensionId: string,
    x: number,
    y: number,
    z: number
];
export declare type RegionSyncData = [
    dimesnionId: string,
    x: number,
    y: number,
    z: number,
    buffer: SharedArrayBuffer
];
export declare type RegionUnSyncData = [
    dimensionId: string,
    x: number,
    y: number,
    z: number
];
export declare type VoxelPaletteSyncData = [
    voxelPalette: VoxelPalette,
    voxelPaletteMap: VoxelPaletteMap
];
export declare type VoxelDataSync = [
    initData: RemoteTagManagerInitData,
    voxelMapData: SharedArrayBuffer
];
export declare type VoxelMapSyncData = [data: Record<number, string>];
