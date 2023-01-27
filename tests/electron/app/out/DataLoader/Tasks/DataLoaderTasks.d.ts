import type { LocationData } from "Meta/Data/CommonTypes";
export declare const DataLoaderTasks: {
    saveRegion: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    loadRegion: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    loadRegionHeader: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    saveColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    loadColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    unLoadColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    setPath: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<[id: string]>;
    columnExists: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    columnTimestamp: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
};
