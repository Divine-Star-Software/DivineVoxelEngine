export interface VoxelMeshInterface {
 rebuildMeshGeometory(chunkMesh: BABYLON.Mesh, data: MeshSetData): void;

 createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;

 createMeshGeometory(mesh: BABYLON.Mesh, data: MeshSetData): void;
}

export type MeshSetData = {
 positionArray: Float32Array;
 normalsArray: Float32Array;
 indiciesArray: Int32Array;
 AOColorsArray: Float32Array;
 RGBLightColorsArray: Float32Array;
 sunLightColorsArray: Float32Array;
 colorsArray: Float32Array;
 uvArray: Float32Array;
 extra: any;
};
