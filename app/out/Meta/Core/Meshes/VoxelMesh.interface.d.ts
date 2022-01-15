/// <reference types="babylonjs" />
export interface VoxelMeshInterface {
    rebuildMeshGeometory(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearcColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): void;
    createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
    createMeshGeometory(mesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, linearColors: Float32Array, fullColors: Float32Array, uvs: Float32Array): void;
}
