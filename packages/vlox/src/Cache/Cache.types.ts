import { TextureData } from "Textures/Texture.types";
import { ConstructorVoxelModelSyncData } from "VoxelData/VoxelSyncData";

export interface CachedVoxelModelData extends ConstructorVoxelModelSyncData {}


export interface CacheData {
  models: CachedVoxelModelData;
  textures: TextureData[]
}
