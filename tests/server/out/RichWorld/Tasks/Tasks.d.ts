import type { SetRichVoxel } from "Meta/Data/RichWorldData.types";
import type { LocationData } from "Meta/Data/CommonTypes.js";
export declare const RichWorldTasks: {
    setVoxel: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<SetRichVoxel>;
    removeVoxel: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
};
