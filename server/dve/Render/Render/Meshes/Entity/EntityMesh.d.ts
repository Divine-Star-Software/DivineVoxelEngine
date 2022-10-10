/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index.js";
import type { MeshSetData } from "Meta/Render/Meshes/VoxelMesh.interface";
export declare const EntityMesh: {
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _applyVertexData(mesh: BABYLON.Mesh, data: MeshSetData): void;
    rebuildMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): Promise<BABYLON.Mesh>;
    createMesh(x: number, y: number, z: number, data: MeshSetData): Promise<BABYLON.Mesh>;
};
