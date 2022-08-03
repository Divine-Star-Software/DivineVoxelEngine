/// <reference types="babylonjs" />
import type { MeshSetData, VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare const MeshManager: {
    scene: BABYLON.Scene | null;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
    entityMesh: {
        pickable: boolean;
        checkCollisions: boolean;
        seralize: boolean;
        clearCachedGeometry: boolean;
        createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
        syncSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        _applyVertexData(mesh: BABYLON.Mesh, data: MeshSetData): void;
        rebuildMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): Promise<BABYLON.Mesh>;
        createMesh(x: number, y: number, z: number, data: MeshSetData): Promise<BABYLON.Mesh>;
    };
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    $INIT(): void;
    setScene(scene: BABYLON.Scene): void;
    reStart(): void;
    removeChunkMesh(type: VoxelSubstanceType, chunkKey: string): void;
    handleEntityUpdate(x: number, y: number, z: number, data: any): void;
    handleChunkUpdate(type: VoxelSubstanceType, chunkKey: string, data: any): void;
    requestChunkBeRemoved(chunkKey: string): void;
    _updateMesh(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
};
