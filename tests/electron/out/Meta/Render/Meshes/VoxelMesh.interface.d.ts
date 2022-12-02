/// <reference types="babylonjs" />
import { EngineSettingsData } from "Meta/index";
export declare type VoxelMeshInterface = {
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    rebuildMeshGeometory(chunkMesh: BABYLON.Mesh, data: MeshSetData): void;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): void;
    syncSettings(settings: EngineSettingsData): void;
} & {
    [key: string]: any;
};
export declare type MeshSetData = {
    positionArray: Float32Array;
    normalsArray: Float32Array;
    indiciesArray: Uint16Array;
    faceDataArray: Float32Array;
    AOColorsArray: Float32Array;
    lightColorsArray: Float32Array;
    colorsArray: Float32Array;
    uvArray: Float32Array;
    overlayUVArray: Float32Array;
    extra: any;
};
