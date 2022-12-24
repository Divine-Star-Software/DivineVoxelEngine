import type { VoxelTemplateSubstanceType } from "Meta/index";

export type SetChunkMeshTask = [
 dimension: string,
 substanceType: VoxelTemplateSubstanceType,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
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

export type RemoveChunkMeshTasks = [
 dimension: string,
 substanceType: VoxelTemplateSubstanceType,
 chunkX: number,
 chunkY: number,
 chunkZ: number
];

export type RemoveChunksOutsideDistance = [
 dimension: string,
 x: number,
 y: number,
 z: number,
 distance: number
];
