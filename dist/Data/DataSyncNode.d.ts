import type { VoxelDataSync, PaletteSyncData, WorldDataSync, RegisterStringMapSync } from "Meta/Data/DataSync.types.js";
import type { LocationData } from "voxelspaces";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import { RemoteTagManagerInitData } from "divine-binary-tags";
export declare const DataSyncNode: {
    maps: {
        strings: import("threadcomm").DataSync<RegisterStringMapSync, void>;
        objects: import("threadcomm").DataSync<RegisterStringMapSync, void>;
    };
    palettes: {
        voxel: import("threadcomm").DataSync<PaletteSyncData, any>;
        substance: import("threadcomm").DataSync<PaletteSyncData, any>;
    };
    worldData: {
        dimension: import("threadcomm").DataSync<DimensionData, void>;
        chunk: import("threadcomm").DataSync<WorldDataSync, LocationData>;
        column: import("threadcomm").DataSync<WorldDataSync, LocationData>;
        region: import("threadcomm").DataSync<WorldDataSync, LocationData>;
        regionHeader: import("threadcomm").DataSync<WorldDataSync, LocationData>;
    };
    tags: {
        voxel: import("threadcomm").DataSync<VoxelDataSync, any>;
        substance: import("threadcomm").DataSync<RemoteTagManagerInitData, any>;
        chunk: import("threadcomm").DataSync<RemoteTagManagerInitData, void>;
        column: import("threadcomm").DataSync<RemoteTagManagerInitData, void>;
        region: import("threadcomm").DataSync<RemoteTagManagerInitData[], void>;
    };
};
