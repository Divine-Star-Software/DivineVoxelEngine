/// <reference types="babylonjs" />
import type { FloraMaterial } from "Render/Render/Materials/Flora/FloraMaterial";
import { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
export declare class FloraMesh implements VoxelMeshInterface {
    private material;
    constructor(material: FloraMaterial);
    rebuildMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<void>;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<BABYLON.Mesh>;
}
