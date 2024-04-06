import { DVENodeMeshAttributes } from "Interfaces/Render/Nodes/DVERenderNode.types";
import type { LocationData } from "Math/index.js";
import type { VoxelTemplateSubstanceType } from "Types/Data/Voxels/Voxel.types";
export type SetChunkMeshTask = [
 location: LocationData,
 meshes: (ChunkMeshData | RemoveChunkTasks)[]
];

export type ChunkMeshData = [
 substanceType: VoxelTemplateSubstanceType,
 meshData : [
  location: LocationData,
   attributes: DVENodeMeshAttributes
 ]
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
