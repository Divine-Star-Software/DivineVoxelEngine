/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index.js";
import { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import { DVEMaterial } from "../Materials/DVEMaterial.js";
export declare class DVEMesh {
    name: string;
    dveMat: DVEMaterial;
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    defaultBb: BABYLON.BoundingInfo;
    constructor(name: string, dveMat: DVEMaterial);
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _applyVertexData(mesh: BABYLON.Mesh, data: SetChunkMeshTask): void;
    rebuildMeshGeometory(mesh: BABYLON.Mesh, data: SetChunkMeshTask): Promise<BABYLON.Mesh>;
    createMeshGeometory(mesh: BABYLON.Mesh, data: SetChunkMeshTask): Promise<BABYLON.Mesh>;
}
