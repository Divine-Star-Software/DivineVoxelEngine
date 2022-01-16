/// <reference types="babylonjs" />
import type { FloraMaterial } from "Core/Render/Materials/Flora/FloraMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
export declare class FloraMesh implements VoxelMeshInterface {
    private material;
    constructor(material: FloraMaterial);
    rebuildMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearcColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): void;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): BABYLON.Mesh;
}
