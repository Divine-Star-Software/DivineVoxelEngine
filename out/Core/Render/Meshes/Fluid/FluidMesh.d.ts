/// <reference types="babylonjs" />
import type { FluidMaterial } from "Core/Render/Materials/Fluid/FluidMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
export declare class FluidMesh implements VoxelMeshInterface {
    private material;
    constructor(material: FluidMaterial);
    rebuildMeshGeometory(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearcColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): void;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): BABYLON.Mesh;
}
