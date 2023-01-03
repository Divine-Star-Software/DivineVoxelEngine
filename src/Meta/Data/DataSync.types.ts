import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types";
import type { DimensionData } from "./DimensionData.types";
import type { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type ChunkSyncData = [
 dimesnionId: string,
 x: number,
 y: number,
 z: number,
 buffer: SharedArrayBuffer
];

export type ChunkUnSyncData = [
 dimensionId: string,
 x: number,
 y: number,
 z: number
];

export type ColumnSyncData = [
 dimesnionId: string,
 x: number,
 y: number,
 z: number,
 buffer: SharedArrayBuffer
];

export type ColumnUnSyncData = [
 dimensionId: string,
 x: number,
 y: number,
 z: number
];

export type RegionSyncData = [
 dimesnionId: string,
 x: number,
 y: number,
 z: number,
 buffer: SharedArrayBuffer
];

export type RegionUnSyncData = [
 dimensionId: string,
 x: number,
 y: number,
 z: number
];

export type VoxelPaletteSyncData = [
 voxelPalette: VoxelPalette,
 voxelPaletteMap: VoxelPaletteMap
];

export type VoxelDataSync = [
 initData: RemoteTagManagerInitData,
 voxelMapData: SharedArrayBuffer
];

export type VoxelMapSyncData = [data: Record<number, string>];
