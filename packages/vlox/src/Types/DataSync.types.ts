import type { BinaryStructData } from "@amodx/binary/";
import { LocationData } from "Math/index.js";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];

export type PaletteSyncData = [
 voxelPalette: string[],
 voxelPaletteMap: Record<string, number>,
 nameToIdMap: Record<string, string>,
 idToNameMap: Record<string, string>
];

export type VoxelDataSync = [
 initData: BinaryStructData,
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
 map: any[]
];
export type VoxelMapSyncData = string[];
