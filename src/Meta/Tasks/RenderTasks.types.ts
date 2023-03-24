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
 indices: Uint16Array,
 voxelData: Float32Array,
 colors: Float32Array,
 uvs: Float32Array,
 overlayUVs: Float32Array
];

export type SetNodeMesh = [
 location: LocationData,
  others: [id: string, data: any[],stride : number][]
 
];

export type BuildNodeMesh = [location: LocationData, type: string, data: any];

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
