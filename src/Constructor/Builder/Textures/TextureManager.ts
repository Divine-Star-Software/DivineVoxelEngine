import { ConstructorTextureData } from "Meta/Constructor/Constructor.types";
import type { TextureTypes } from "Meta/Render/Textures/Texture.types";

export const TextureManager = {
 textureDataHasBeenSet: false,
 uvTextureMap: <Record<string, Record<string, number>>>{},
 overlayUVTextureMap: <Record<string, Record<string, number>>>{},
 getTextureUV(data: ConstructorTextureData, overlay: boolean = false): number {
  const [textureType, textureId, varation] = data;
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

 setOverlayUVTextureMap(data: Record<TextureTypes, Record<string, number>>) {
  this.textureDataHasBeenSet = true;
  this.overlayUVTextureMap = data;
 },

 releaseTextureData() {
  (this as any).uvTextureMap = null;
  (this as any).overlayUVTextureMap = null;
  delete (this as any)["uvTextureMap"];
  delete (this as any)["overlayUVTextureMap"];
 },

 isReady() {
  return this.textureDataHasBeenSet;
 },
};
