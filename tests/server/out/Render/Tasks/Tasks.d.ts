import type { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
export declare const RenderTasks: {
    setChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<SetChunkMeshTask>;
    removeChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RemoveChunkMeshTasks>;
};
