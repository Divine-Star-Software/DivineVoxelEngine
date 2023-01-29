import type { VoxelDataSync, VoxelPaletteSyncData, WorldDataSync, RegisterStringMapSync } from "Meta/Data/DataSync.types.js";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
export declare const DataSyncNode: {
    _states: Record<string, boolean>;
    isReady(): boolean;
    voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
    voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelDataSync, any>;
    dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<DimensionData, void>;
    chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<WorldDataSync, LocationData>;
    column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<WorldDataSync, LocationData>;
    region: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<WorldDataSync, LocationData>;
    regionHeader: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<WorldDataSync, LocationData>;
    chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    regionTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData[], void>;
    stringMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RegisterStringMapSync, void>;
};
