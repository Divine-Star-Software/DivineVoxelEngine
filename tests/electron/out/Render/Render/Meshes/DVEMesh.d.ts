/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index.js";
import { ChunkMeshData } from "Meta/Tasks/RenderTasks.types";
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
    setMeshData(mesh: BABYLON.Mesh, chunkX: number, chunkY: number, chunkZ: number, data: ChunkMeshData): Promise<BABYLON.Mesh>;
}
