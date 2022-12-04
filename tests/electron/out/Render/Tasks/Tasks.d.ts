import type { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Meta/Data/CommonTypes.js";
export declare const RenderTasks: {
    setChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<SetChunkMeshTask>;
    removeChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RemoveChunkMeshTasks>;
    removeAllChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
};
