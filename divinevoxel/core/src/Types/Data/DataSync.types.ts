import type { RemoteTagManagerInitData } from "@divinestar/binary/";
import { LocationData } from "@divinestar/voxelspaces";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];

export type PaletteSyncData = [
 voxelPalette: string[],
 voxelPaletteMap: Record<string, number>
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
export type RegisterObjectMapSync = [
 segment: string,
 id: string,
 map: Record<number,any>
];
export type VoxelMapSyncData = string[];
