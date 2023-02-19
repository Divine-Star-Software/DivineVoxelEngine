import type { VoxelDataSync, VoxelPaletteSyncData, WorldDataSync, RegisterStringMapSync } from "Meta/Data/DataSync.types.js";
import type { LocationData } from "voxelspaces";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import { RemoteTagManagerInitData } from "divine-binary-tags";
export declare const DataSyncNode: {
    _states: Record<string, boolean>;
    isReady(): boolean;
    voxelPalette: import("threadcomm").DataSync<VoxelPaletteSyncData, any>;
    voxelData: import("threadcomm").DataSync<VoxelDataSync, any>;
    dimension: import("threadcomm").DataSync<DimensionData, void>;
    chunk: import("threadcomm").DataSync<WorldDataSync, LocationData>;
    column: import("threadcomm").DataSync<WorldDataSync, LocationData>;
    region: import("threadcomm").DataSync<WorldDataSync, LocationData>;
    regionHeader: import("threadcomm").DataSync<WorldDataSync, LocationData>;
    chunkTags: import("threadcomm").DataSync<RemoteTagManagerInitData, void>;
    columnTags: import("threadcomm").DataSync<RemoteTagManagerInitData, void>;
    regionTags: import("threadcomm").DataSync<RemoteTagManagerInitData[], void>;
    stringMap: import("threadcomm").DataSync<RegisterStringMapSync, void>;
};
