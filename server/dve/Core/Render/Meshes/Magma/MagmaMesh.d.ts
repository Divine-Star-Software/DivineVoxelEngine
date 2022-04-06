/// <reference types="babylonjs" />
import type { MagmaMaterial } from "Core/Render/Materials/Magma/MagmaMaterial";
import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
export declare class MagmaMesh implements VoxelMeshInterface {
    private material;
    constructor(material: MagmaMaterial);
    rebuildMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): void;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): BABYLON.Mesh;
}
