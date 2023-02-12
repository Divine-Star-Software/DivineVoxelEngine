import type { Scene } from "babylonjs";
import { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
import { DVEMesh } from "Render/Render/Meshes/DVEMesh.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const MeshManager: {
    scene: Scene;
    runningUpdate: boolean;
    meshMakers: Record<string, DVEMesh>;
    $INIT(scene: Scene): void;
    chunks: {
        remove(data: RemoveChunkMeshTasks): false | undefined;
        update(data: SetChunkMeshTask): void;
        removeColumn(data: LocationData): false | undefined;
    };
};
