/// <reference types="babylonjs" />
import type { FluidMaterial } from "Core/Render/Materials/Fluid/FluidMaterial";
export declare class FluidMesh {
    private material;
    mesh: BABYLON.Mesh;
    scene: BABYLON.Scene;
    beenCreated: boolean;
    constructor(material: FluidMaterial);
    rebuildMeshGeometory(positions: Float32Array, indicies: Int32Array, RGBLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<void>;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(positions: Float32Array, indicies: Int32Array, RGBLightColors: Float32Array, sunLightColors: Float32Array, colors: Float32Array, uvs: Float32Array): Promise<BABYLON.Mesh>;
}
