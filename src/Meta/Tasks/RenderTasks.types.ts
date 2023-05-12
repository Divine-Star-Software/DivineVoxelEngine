import type { LocationData } from "voxelspaces";
import type { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import type { MeshAttributes } from "../../Constructor/Builder/Types/MeshData.types";

export type SetChunkMeshTask = [
 location: LocationData,
 meshes: (ChunkMeshData | RemoveChunkTasks)[]
];

export type ChunkMeshData = [
 substanceType: VoxelTemplateSubstanceType,
 meshData : SetNodeMesh
];

export type SetNodeMesh = [
 location: LocationData,
  attributes: MeshAttributes
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
