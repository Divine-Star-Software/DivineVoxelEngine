import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";

export const TextureManager = {
 textureDataHasBeenSet: false,
 uvTextureMap: <Record<VoxelSubstanceType, Record<string, number>>>{},
 overlayUVTextureMap: <Record<VoxelSubstanceType, Record<string, number>>>{},
 getTextureUV(
  voxelSubstanceType: VoxelSubstanceType,
  textureId: string,
  varation?: string | false | null,
  overlay: boolean = false
 ): number {
  let id = textureId;
  if (varation) {
   id = `${textureId}:${varation}`;
  }
  let uv = -1;
  if (!overlay) {
   uv = this.uvTextureMap[voxelSubstanceType][id];
  } else {
   uv = this.overlayUVTextureMap[voxelSubstanceType][id];
  }
  if (uv == -1) {
   throw new Error(
    `Texture with id: ${id} does not exists. Overlay : ${overlay}`
   );
  }
  return uv;
 },

 setUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>) {
  this.textureDataHasBeenSet = true;
  this.uvTextureMap = data;
 },

 setOverlayUVTextureMap(
  data: Record<VoxelSubstanceType, Record<string, number>>
 ) {
  this.textureDataHasBeenSet = true;
  this.overlayUVTextureMap = data;
 },

 isReady() {
  return this.textureDataHasBeenSet;
 },
};
