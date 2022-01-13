/// <reference types="babylonjs" />
export declare class ChunkBuilder {
    rebuildChunkMesh(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, colors: Float32Array, uvs: Float32Array): void;
    makeChunkMesh(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, material: BABYLON.ShaderMaterial, positions: Float32Array, indicies: Int32Array, colors: Float32Array, uvs: Float32Array): BABYLON.Mesh;
}
