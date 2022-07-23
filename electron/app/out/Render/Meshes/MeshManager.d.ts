/// <reference types="babylonjs" />
import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare const MeshManager: {
    scene: BABYLON.Scene | null;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    $INIT(): void;
    setScene(scene: BABYLON.Scene): void;
    reStart(): void;
    removeChunkMesh(type: VoxelSubstanceType, chunkKey: string): void;
    handleUpdate(type: VoxelSubstanceType, chunkKey: string, data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMesh(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
};
