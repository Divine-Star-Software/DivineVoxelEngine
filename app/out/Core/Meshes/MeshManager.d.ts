/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "Core/DivineVoxelEngine";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare class MeshManager {
    private DVE;
    scene: BABYLON.Scene;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    constructor(DVE: DivineVoxelEngine);
    setScene(scene: BABYLON.Scene): void;
    handleUpdate(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): void;
    _updateFluidMesh(data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): Promise<void>;
    _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): Promise<void>;
}
