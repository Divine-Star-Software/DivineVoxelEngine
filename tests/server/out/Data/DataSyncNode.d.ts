import type { ChunkSyncData, ChunkUnSyncData, VoxelMapSyncData, RegionSyncData, RegionUnSyncData, VoxelDataSync, VoxelPaletteSyncData } from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
export declare const DataSyncNode: {
    _states: Record<string, boolean>;
    isReady(): boolean;
    voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
    voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelDataSync, any>;
    materialMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelMapSyncData, any>;
    colliderMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelMapSyncData, any>;
    dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<DimensionData, void>;
    chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    region: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RegionSyncData, RegionUnSyncData>;
    regionHeader: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RegionSyncData, RegionUnSyncData>;
    chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    regionTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData[], void>;
};
