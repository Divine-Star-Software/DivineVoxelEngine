import type { RemoveChunkMeshTasks, RemoveChunksOutsideDistance, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const RenderTasks: {
    setChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<SetChunkMeshTask>;
    removeChunk: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RemoveChunkMeshTasks>;
    removeColumn: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<LocationData>;
    removeColumnsOutsideRadius: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<RemoveChunksOutsideDistance>;
};
