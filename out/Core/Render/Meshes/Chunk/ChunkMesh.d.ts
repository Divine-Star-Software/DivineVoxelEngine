/// <reference types="babylonjs" />
import type { ChunkMaterial } from "Core/Render/Materials/Chunk/ChunkMaterial";
export declare class ChunkMesh {
    private chunkMaterial;
    constructor(chunkMaterial: ChunkMaterial);
    rebuildChunkMesh(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, colors: Float32Array, uvs: Float32Array): void;
    makeChunkMesh(chunkMesh: BABYLON.Mesh, chunkX: number, chunkZ: number, positions: Float32Array, indicies: Int32Array, colors: Float32Array, uvs: Float32Array): BABYLON.Mesh;
}
