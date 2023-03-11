import type { RemoveChunkMeshTasks, RemoveChunksOutsideDistance, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "voxelspaces";
export declare const RenderTasks: {
    setChunk: import("threadcomm").Task<SetChunkMeshTask>;
    removeChunk: import("threadcomm").Task<RemoveChunkMeshTasks>;
    removeColumn: import("threadcomm").Task<LocationData>;
    removeColumnsOutsideRadius: import("threadcomm").Task<RemoveChunksOutsideDistance>;
};
