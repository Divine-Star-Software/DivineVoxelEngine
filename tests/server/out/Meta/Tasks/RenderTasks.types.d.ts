import type { VoxelTemplateSubstanceType } from "Meta/index";
export declare type SetChunkMeshTask = [
    dimension: string,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    meshes: (ChunkMeshData | RemoveChunkTasks)[]
];
export declare type ChunkMeshData = [
    substanceType: VoxelTemplateSubstanceType,
    positions: Float32Array,
    normals: Float32Array,
    indicies: Uint16Array,
    faceData: Float32Array,
    AOColors: Float32Array,
    lightColors: Float32Array,
    colors: Float32Array,
    uvs: Float32Array,
    overlayUVs: Float32Array
];
declare type RemoveChunkTasks = [
    substanceType: VoxelTemplateSubstanceType,
    removeFlag: false
];
export declare type RemoveChunkMeshTasks = [
    dimension: string,
    substanceType: VoxelTemplateSubstanceType,
    chunkX: number,
    chunkY: number,
    chunkZ: number
];
export declare type RemoveChunksOutsideDistance = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    distance: number
];
export {};
