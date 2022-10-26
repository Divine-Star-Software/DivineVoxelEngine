import { DimensionData } from "./DimensionData.types";
import { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type ChunkSyncData = [
 dimesnionId: number | string,
 x: number,
 y: number,
 z: number,
 Buffer: SharedArrayBuffer
];

export type ChunkUnSyncData = [
 dimensionId: number | string,
 x: number,
 y: number,
 z: number
];


export type VoxelPaletteSyncData = [
 voxelPalette: VoxelPalette,
 voxelPaletteMap: VoxelPaletteMap
];


export type VoxelDataSync = [
 voxelData: SharedArrayBuffer,
 voxelMapData: SharedArrayBuffer
];

