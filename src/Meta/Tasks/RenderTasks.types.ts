import type { LocationData } from "voxelspaces";
import type { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types";


export type SetChunkMeshTask = [
 location: LocationData,
 meshes: (ChunkMeshData | RemoveChunkTasks)[]
];

export type ChunkMeshData = [
 substanceType: VoxelTemplateSubstanceType,
 positions: Float32Array,
 normals: Float32Array,
 indicies: Uint16Array,
 voxelData: Float32Array,
 colors: Float32Array,
 uvs: Float32Array,
 overlayUVs: Float32Array,
];

type RemoveChunkTasks = [
 substanceType: VoxelTemplateSubstanceType,
 removeFlag: false
];

export type RemoveChunkMeshTasks = [
 location: LocationData,
 substanceType: VoxelTemplateSubstanceType
];

export type RemoveChunksOutsideDistance = [
 location: LocationData,
 distance: number
];
