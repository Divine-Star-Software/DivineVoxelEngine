import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
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
