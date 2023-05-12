import type { Scene } from "@babylonjs/core";
import { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
import { LocationData } from "voxelspaces";
export declare const MeshManager: {
    scene: Scene;
    runningUpdate: boolean;
    $INIT(scene: Scene): void;
    removeColumnsOutsideRadius(origion: LocationData, radius: number): void;
    chunks: {
        remove(data: RemoveChunkMeshTasks): false | undefined;
        update(data: SetChunkMeshTask): void;
        removeColumn(data: LocationData): false | undefined;
    };
};
