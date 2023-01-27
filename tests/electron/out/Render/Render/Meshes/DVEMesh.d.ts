/// <reference types="babylonjs" />
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { EngineSettingsData } from "Meta/index.js";
import { ChunkMeshData } from "Meta/Tasks/RenderTasks.types";
import { DVEMaterial } from "../Materials/DVEMaterial.js";
export declare class DVEMesh {
    name: string;
    dveMat: DVEMaterial;
    meshes: BABYLON.Mesh[];
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    defaultBb: BABYLON.BoundingInfo;
    constructor(name: string, dveMat: DVEMaterial);
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _setEmptyData(mesh: BABYLON.Mesh): void;
    _clearCached(mesh: BABYLON.Mesh): void;
    removeMesh(mesh: BABYLON.Mesh): void;
    setMeshData(mesh: BABYLON.Mesh, location: LocationData, data: ChunkMeshData): Promise<BABYLON.Mesh>;
}
