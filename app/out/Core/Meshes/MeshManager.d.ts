/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "Core/DivineVoxelEngine";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare class MeshManager {
    private DVE;
    scene: BABYLON.Scene;
    runningUpdate: boolean;
    constructor(DVE: DivineVoxelEngine);
    chunkMeshes: Record<string, BABYLON.Mesh>;
    meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
    meshMakes: Record<VoxelSubstanceType, VoxelMeshInterface>;
    handleUpdate(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkZ: number, data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkZ: number, data: any): Promise<void>;
    _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkZ: number, data: any): Promise<void>;
}
