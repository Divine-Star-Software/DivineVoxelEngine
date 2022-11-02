/// <reference types="babylonjs" />
import type { MeshSetData, VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { ItemMeshSetData } from "Meta/Render/Meshes/ItemMesh.types.js";
import { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
export declare const MeshManager: {
    scene: BABYLON.Scene | null;
    runningUpdate: boolean;
    meshes: Record<VoxelSubstanceType, Record<number, Record<string, BABYLON.Mesh>>>;
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
    itemMesh: {
        pickable: boolean;
        checkCollisions: boolean;
        seralize: boolean;
        clearCachedGeometry: boolean;
        createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
        syncSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        _applyVertexData(mesh: BABYLON.Mesh, data: ItemMeshSetData): void;
        rebuildMeshGeometory(mesh: BABYLON.Mesh, data: ItemMeshSetData): Promise<BABYLON.Mesh>;
        createMesh(x: number, y: number, z: number, data: ItemMeshSetData): Promise<BABYLON.Mesh>;
    };
    meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;
    $INIT(): void;
    setScene(scene: BABYLON.Scene): void;
    reStart(): void;
    removeChunkMesh(dimesnion: number, type: VoxelSubstanceType, chunkKey: string): void;
    handleItemUpdate(x: number, y: number, z: number, data: any): void;
    handleEntityUpdate(x: number, y: number, z: number, data: any): void;
    handleChunkUpdate(dimesnion: number, type: VoxelSubstanceType, chunkKey: string, data: SetChunkMeshTask): void;
    requestChunkBeRemoved(dimesnion: number, chunkKey: string): void;
    _updateMesh(dimesnion: number, type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    _buildNewMesh(dimesnion: number, type: VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
};
