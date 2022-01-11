/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "../DivineVoxelEngine";
import { ChunkBuilder } from "./ChunkBuilder.js";
export declare class BuilderManager {
    private DS;
    numBuilders: number;
    count: number;
    runningBlockUpdate: boolean;
    maxChunkMeshes: number;
    aviableMeshes: BABYLON.Mesh[];
    builders: Worker[];
    chunkBuilder: ChunkBuilder;
    scene: BABYLON.Scene;
    material: BABYLON.ShaderMaterial;
    shadowGen: BABYLON.ShadowGenerator;
    chunkMeshes: Record<number, Record<number, BABYLON.Mesh>>;
    constructor(DS: DivineVoxelEngine);
    _returnChunkMesh(mesh: BABYLON.Mesh): void;
    _getChunkMesh(): BABYLON.Mesh;
    createBaseChunkMeshes(): void;
    createBuilderWorker(path: string): void;
    setScene(scene: BABYLON.Scene): void;
    setShadowGen(shadowGenerator: BABYLON.ShadowGenerator): void;
    setMaterial(material: BABYLON.ShaderMaterial): void;
    requestChunkBeRemoved(chunkX: number, chunkZ: number): Promise<void>;
    updateChunkUVs(chunkX: number, chunkZ: number, uvs: Float32Array): Promise<void>;
    _handleChunkBuildMessage(event: MessageEvent): Promise<void>;
    _updateChunk(chunkX: number, chunkZ: number, data: any): Promise<void>;
    _buildNewChunk(chunkX: number, chunkZ: number, data: any): Promise<void>;
}
