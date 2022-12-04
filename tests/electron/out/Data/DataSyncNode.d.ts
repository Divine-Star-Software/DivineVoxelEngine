import type { ChunkSyncData, ChunkUnSyncData, VoxelDataSync, VoxelPaletteSyncData } from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Meta/Util.types.js";
export declare const DataSyncNode: {
    _states: Record<string, boolean>;
    isReady(): boolean;
    chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
    chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<RemoteTagManagerInitData, void>;
    voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelDataSync, any>;
    dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<DimensionData, void>;
};
