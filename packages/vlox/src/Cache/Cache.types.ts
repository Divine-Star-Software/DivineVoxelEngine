import { CompactMeshData } from "../Mesher/Types/Mesher.types";
import { TextureData } from "../Textures/Texture.types";
import { FinalCompiledVoxelModelData } from "../Voxels/Models/CompiledVoxelModel.types";

export interface CachedVoxelModelData extends FinalCompiledVoxelModelData {}

export interface CachedDisplayIndex {
  textures: Record<string, Record<string, string>>;
  meshes: Record<string, Record<string, {model:CompactMeshData;material:string}>>;
}

export interface CacheData {
  models: FinalCompiledVoxelModelData;
  textures: TextureData[];
  displayIndex: CachedDisplayIndex;
}
