/// <reference types="babylonjs" />
import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { RemoveChunkMeshTasks, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
import { DVEMesh } from "Render/Render/Meshes/DVEMesh.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
export declare const MeshManager: {
    scene: BABYLON.Scene | null;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>;
    meshMakers: Record<VoxelSubstanceType, DVEMesh>;
    $INIT(scene: BABYLON.Scene): void;
    removeChunk(data: RemoveChunkMeshTasks): false | undefined;
    updateChunk(data: SetChunkMeshTask): void;
    removeColumn(data: LocationData): false | undefined;
    handleItemUpdate(x: number, y: number, z: number, data: any): void;
    handleEntityUpdate(x: number, y: number, z: number, data: any): void;
};
