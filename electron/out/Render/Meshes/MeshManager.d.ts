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
    handleUpdate(type: VoxelSubstanceType, chunkKey: string, data: any): void;
    handleUpdateN(type: VoxelSubstanceType, chunkKey: string, data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMeshN(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMeshN(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _updateMeshO(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMeshO(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
};
