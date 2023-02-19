import type { RemoteTagManagerInitData } from "divine-binary-tags";
import { LocationData } from "voxelspaces";
import type { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";
export declare type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";
export declare type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];
export declare type VoxelPaletteSyncData = [
    voxelPalette: VoxelPalette,
    voxelPaletteMap: VoxelPaletteMap
];
export declare type VoxelDataSync = [
    initData: RemoteTagManagerInitData,
    voxelMapData: SharedArrayBuffer
];
export declare type RegisterStringMapSync = [
    segment: string,
    id: string,
    map: string[]
];
export declare type VoxelMapSyncData = string[];
