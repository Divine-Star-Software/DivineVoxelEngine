import { CompactMeshData } from "../../../Mesher/Types/Mesher.types";
import type { LocationData } from "../../../Math/index.js";
export type SetChunkMeshTask = [
  location: LocationData,
  meshes: CompactMeshData,
  effects: ChunkEffectData[],
  priority: number,
];

export type ChunkEffectData = [id: string, data: any];

export type ChunkMeshData = [
  substanceType: string,
  meshData: [location: LocationData, mesh: CompactMeshData],
];

export type RemoveChunkMeshTasks = [
  location: LocationData,
  substanceType: string,
];

export type RemoveChunksOutsideDistance = [
  location: LocationData,
  distance: number,
];
