/// <reference types="babylonjs" />
import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
export declare const MeshManager: {
    scene: BABYLON.Scene | null;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>;
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    $INIT(): void;
    setScene(scene: BABYLON.Scene): void;
    reStart(): void;
    removeChunkMesh(dimesnion: string, type: VoxelSubstanceType, chunkKey: string): void;
    handleItemUpdate(x: number, y: number, z: number, data: any): void;
    handleEntityUpdate(x: number, y: number, z: number, data: any): void;
    handleChunkUpdate(dimesnion: string, type: VoxelSubstanceType, chunkKey: string, data: SetChunkMeshTask): void;
    requestChunkBeRemoved(dimesnion: string, chunkKey: string): void;
    _updateMesh(dimesnion: string, type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMesh(dimesnion: string, type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
};
