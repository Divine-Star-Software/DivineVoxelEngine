import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type { VoxelTemplateSubstanceType } from "Meta/index";

export type SetChunkMeshTask = [
 location: LocationData,
 meshes: (ChunkMeshData | RemoveChunkTasks)[]
];

export type ChunkMeshData = [
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
