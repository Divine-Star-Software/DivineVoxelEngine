import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
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
