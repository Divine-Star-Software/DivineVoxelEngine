import { CompactMeshData } from "../Mesher/Types/Mesher.types"
import type { LocationData } from "../Math/index"
export type SetSectionMeshTask = [
  location: LocationData,
  meshes: CompactMeshData,
  effects: SectionEffectData[],
  priority: number,
];

export type SectionEffectData = [id: string, data: any];

export type SectionMeshData = [
  substanceType: string,
  meshData: [location: LocationData, mesh: CompactMeshData],
];

export type RemoveSectionMeshTasks = [
  location: LocationData,
  substanceType: string,
];

export type RemoveSectionsOutsideDistance = [
  location: LocationData,
  distance: number,
];
