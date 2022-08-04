/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index.js";
import { ItemMeshSetData } from "Meta/Render/Meshes/ItemMesh.types.js";
export declare const ItemMesh: {
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _applyVertexData(mesh: BABYLON.Mesh, data: ItemMeshSetData): void;
    rebuildMeshGeometory(mesh: BABYLON.Mesh, data: ItemMeshSetData): Promise<BABYLON.Mesh>;
    createMesh(x: number, y: number, z: number, data: ItemMeshSetData): Promise<BABYLON.Mesh>;
};
