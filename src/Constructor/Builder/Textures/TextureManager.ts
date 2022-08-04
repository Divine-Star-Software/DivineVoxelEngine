import { TextureTypes } from "Meta/index";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";

export const TextureManager = {
 textureDataHasBeenSet: false,
 uvTextureMap: <Record<TextureTypes, Record<string, number>>>{},
 overlayUVTextureMap: <Record<TextureTypes, Record<string, number>>>{},
 getTextureUV(
  textureType: TextureTypes ,
  textureId: string,
  varation: string | false | null = false,
  overlay: boolean = false
 ): number {
  let id = textureId;
  if (varation) {
   id = `${textureId}:${varation}`;
  }
  let uv = -1;
  if (!overlay) {
   uv = this.uvTextureMap[textureType][id];
  } else {
   uv = this.overlayUVTextureMap[textureType][id];
  }
  if (uv == -1) {
   throw new Error(
    `Texture with id: ${id} does not exists. Overlay : ${overlay}`
   );
  }
  return uv;
 },

 setUVTextureMap(data: Record<TextureTypes, Record<string, number>>) {
  this.textureDataHasBeenSet = true;
  this.uvTextureMap = data;
 },

 setOverlayUVTextureMap(
  data: Record<TextureTypes, Record<string, number>>
 ) {
  this.textureDataHasBeenSet = true;
  this.overlayUVTextureMap = data;
 },

 isReady() {
  return this.textureDataHasBeenSet;
 },
};
