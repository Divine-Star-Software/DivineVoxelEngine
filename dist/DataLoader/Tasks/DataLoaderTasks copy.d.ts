import type { LocationData } from "voxelspaces";
export declare const DataLoaderTasks: {
    saveRegion: import("threadcomm").Task<LocationData>;
    loadRegion: import("threadcomm").Task<LocationData>;
    loadRegionHeader: import("threadcomm").Task<LocationData>;
    saveColumn: import("threadcomm").Task<LocationData>;
    loadColumn: import("threadcomm").Task<LocationData>;
    unLoadColumn: import("threadcomm").Task<LocationData>;
    setPath: import("threadcomm").Task<[id: string]>;
    columnExists: import("threadcomm").Task<LocationData>;
    columnTimestamp: import("threadcomm").Task<LocationData>;
};
