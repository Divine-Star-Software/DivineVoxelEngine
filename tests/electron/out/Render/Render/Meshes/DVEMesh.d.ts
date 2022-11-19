/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index.js";
import { MeshSetData } from "Meta/Render/Meshes/VoxelMesh.interface";
import { DVEMaterial } from "../Materials/DVEMaterial";
export declare class DVEMesh {
    name: string;
    dveMat: DVEMaterial;
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    constructor(name: string, dveMat: DVEMaterial);
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _applyVertexData(mesh: BABYLON.Mesh, data: MeshSetData): void;
    rebuildMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): Promise<BABYLON.Mesh>;
    createMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): Promise<BABYLON.Mesh>;
}
