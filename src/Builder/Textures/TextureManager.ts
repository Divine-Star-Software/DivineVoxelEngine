import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";

export class TextureManager {
 textureDataHasBeenSet = false;
 uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
 getTextureUV(
  voxelSubstanceType: VoxelSubstanceType,
  textureId: string,
  varation?: string
 ): number {
  let id = textureId;
  if (varation) {
   id = `${textureId}:${varation}`;
  }

  return this.uvTextureMap[voxelSubstanceType][id];
 }
 isReady() {
    return this.textureDataHasBeenSet;
 }

 setUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>) {
    this.textureDataHasBeenSet = true;
  this.uvTextureMap = data;
 }
}
