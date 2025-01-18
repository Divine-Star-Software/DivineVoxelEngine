import { TextureData } from "Textures/Texture.types";
import {
  CacheData,
  CachedDisplayIndex,
  CachedVoxelModelData,
} from "./Cache.types";

export class CacheManager {
  static cacheStoreEnabled = false;
  static cacheLoadEnabled = false;

  static cachedData: CacheData | null = null;

  static cachedModelData: CachedVoxelModelData | null = null;
  static cachedTextureData: TextureData[] | null = null;
  static cachedDisplayData: CachedDisplayIndex | null = null;

  static getCachedData(): CacheData {
    if (!this.cacheStoreEnabled)
      throw new Error(`cacheStoreEnabled must be set to true`);
    return {
      models: this.cachedModelData!,
      textures: this.cachedTextureData!,
      displayIndex: this.cachedDisplayData!,
    };
  }
}
