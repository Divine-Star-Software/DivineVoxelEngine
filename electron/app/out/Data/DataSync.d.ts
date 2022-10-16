import type { ChunkSyncData, ChunkUnSyncData, VoxelPaletteSyncData } from "Meta/Data/DataSync.types.js";
export declare const DataSync: {
    chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<ChunkSyncData, ChunkUnSyncData>;
    voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
    voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<VoxelPaletteSyncData, any>;
};
