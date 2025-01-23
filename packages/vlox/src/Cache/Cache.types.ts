import { CompactMeshData } from "../Mesher/Types/Mesher.types";
import { TextureData } from "../Textures/Texture.types";
import { ConstructorVoxelModelSyncData } from "../Voxels/VoxelSyncData";

export interface CachedVoxelModelData extends ConstructorVoxelModelSyncData {}

export interface CachedDisplayIndex {
  textures: Record<string, Record<string, string>>;
  meshes: Record<string, Record<string, {model:CompactMeshData;material:string}>>;
}

export interface CacheData {
  models: CachedVoxelModelData;
  textures: TextureData[];
  displayIndex: CachedDisplayIndex;
}
