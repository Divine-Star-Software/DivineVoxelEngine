/// <reference types="babylonjs" />
import { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { FluidMaterial } from "Render/Render/Materials/Fluid/FluidMaterial";
export declare class FluidMesh implements VoxelMeshInterface {
    private material;
    constructor(material: FluidMaterial);
    rebuildMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<void>;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, aoColors: Float32Array, rgbLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<BABYLON.Mesh>;
}
