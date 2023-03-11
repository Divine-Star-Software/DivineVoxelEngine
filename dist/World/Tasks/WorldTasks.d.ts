import type { LocationData } from "voxelspaces";
import { LoadRegionHeadertasks, LoadWorldDataTasks } from "Meta/Tasks/Tasks.types.js";
export declare const WorldTasks: {
    addChunk: import("threadcomm").Task<LocationData>;
    unLoad: {
        unLoadColumn: import("threadcomm").Task<LocationData>;
    };
    load: {
        loadRegino: import("threadcomm").Task<LoadWorldDataTasks>;
        loadReginoHeader: import("threadcomm").Task<LoadRegionHeadertasks>;
        loadColumn: import("threadcomm").Task<LoadWorldDataTasks>;
        loadChunk: import("threadcomm").Task<LoadWorldDataTasks>;
    };
};
