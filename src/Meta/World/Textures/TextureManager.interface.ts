import { VoxelSubstanceType } from "../../Voxels/Voxel.types";
import { TextureData } from "./Texture.types";

export interface TextureManagerInterface {
 defineDefaultTexturePath(path: string): void;

 getTextureUV(
  voxelSubstanceType: VoxelSubstanceType,
  textureId: string,
  varation?: string
 ): number;

 registerTexture(
  voxelSubstanceType: VoxelSubstanceType,
  textureData: TextureData
 ): void;
}
