import type { RemoteTagManagerInitData } from "divine-binary-tags";
import { LocationData } from "voxelspaces";
import type { DimensionData } from "./DimensionData.types";
import type { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];

export type VoxelPaletteSyncData = [
 voxelPalette: VoxelPalette,
 voxelPaletteMap: VoxelPaletteMap
];

export type VoxelDataSync = [
 initData: RemoteTagManagerInitData,
 voxelMapData: SharedArrayBuffer
];

export type RegisterStringMapSync = [
 segment: string,
 id: string,
 map: string[]
];

export type VoxelMapSyncData = string[];
