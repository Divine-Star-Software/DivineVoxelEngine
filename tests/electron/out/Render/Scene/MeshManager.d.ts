import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
import { DVEMesh } from "Render/Render/Meshes/DVEMesh.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const MeshManager: {
    scene: BABYLON.Scene;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>;
    meshMakers: Record<VoxelSubstanceType, DVEMesh>;
    $INIT(scene: BABYLON.Scene): void;
    chunks: {
        remove(data: RemoveChunkMeshTasks): false | undefined;
        update(data: SetChunkMeshTask): void;
        removeColumn(data: LocationData): false | undefined;
    };
};
