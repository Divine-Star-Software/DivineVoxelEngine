/// <reference types="babylonjs" />
import type { SolidMaterial } from "Core/Render/Materials/Solid/SolidMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
export declare class SolidMesh implements VoxelMeshInterface {
    private material;
    constructor(material: SolidMaterial);
    rebuildMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<void>;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<BABYLON.Mesh>;
}
