import type { ChunkSyncData, ChunkUnSyncData, VoxelDataSync, VoxelPaletteSyncData } from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
export declare const DataSyncNode: {
    chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
    voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelDataSync, any>;
    dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<DimensionData, void>;
};
