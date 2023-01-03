import type { LocationData } from "Meta/Data/CommonTypes";
import { LoadRegionHeadertasks, LoadWorldDataTasks } from "Meta/Tasks/Tasks.types.js";
export declare const WorldTasks: {
    addChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    load: {
        loadRegino: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LoadWorldDataTasks>;
        loadReginoHeader: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LoadRegionHeadertasks>;
        loadColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LoadWorldDataTasks>;
        loadChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LoadWorldDataTasks>;
    };
};
