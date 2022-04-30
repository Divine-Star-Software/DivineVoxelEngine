/// <reference types="babylonjs" />
import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender";
import { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare class MeshManager {
    private DVER;
    scene: BABYLON.Scene;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    constructor(DVER: DivineVoxelEngineRender);
    setScene(scene: BABYLON.Scene): void;
    reStart(): void;
    handleUpdate(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): void;
    _updateFluidMesh(data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): Promise<void>;
    _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any): Promise<void>;
}
