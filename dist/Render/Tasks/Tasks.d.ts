import type { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Meta/Data/CommonTypes.js";
export declare const RenderTasks: {
    setChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<SetChunkMeshTask>;
    removeChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
};
