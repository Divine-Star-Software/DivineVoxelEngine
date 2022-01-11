import type { TextureData } from "Meta/World/Textures/Texture.types";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

export class TextureManager implements TextureManagerInterface {
 defaultTexturePath: string = "";
 textureExtension: Record<VoxelSubstanceType, string> = {
  solid: "png",
  transparent: "png",
  fluid: "png",
  magma: "png",
 };

 textures: Record<VoxelSubstanceType, TextureData[]> = {
  solid: [],
  transparent: [],
  fluid: [],
  magma: [],
 };

 uvTextureMap: Record<VoxelSubstanceType, Record<string, number>> = {
  solid: {},
  transparent: {},
  fluid: {},
  magma: {},
 };

 generateTexturesData(): string[] {
  let texturePaths: string[] = [];

  const substances: VoxelSubstanceType[] = [
   "transparent",
   "fluid",
   "solid",
   "magma",
  ];

  let count = 1;
  for (const substance of substances) {
   const extension = this.textureExtension[substance];
   for (const texture of this.textures[substance]) {
    let path: string = texture.path ? texture.path : this.defaultTexturePath;
    if (texture.frames == 0) {
     this.uvTextureMap[substance][`${texture.id}`] = count;
     texturePaths.push(`${path}/${texture.id}/default.${extension}`);
     count++;
     if (texture.varations) {
      for (const varation of Object.keys(texture.varations)) {
       this.uvTextureMap[substance][`${texture.id}:${varation}`] = count;
       texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
       count++;
      }
     }
    } else {
     this.uvTextureMap[substance][`${texture.id}`] = count;
     for (let i = 1; i < texture.frames; i++) {
      texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
      count++;
      if (texture.varations) {
       for (const varation of Object.keys(texture.varations)) {
        this.uvTextureMap[substance][`${texture.id}:${varation}-${i}.${extension}`] = count;
        for (let i = 1; i < texture.frames; i++) {
         texturePaths.push(
          `${path}/${texture.id}/${varation}-${i}.${extension}`
         );
         count++;
        }
       }
      }
     }
    }
   }
  }
  return texturePaths;
 }

 defineDefaultTexturePath(path: string) {
  this.defaultTexturePath = path;
 }
 defineDefaultTextureExtension(
  voxelSubstanceType: VoxelSubstanceType,
  ext: string
 ) {
  this.textureExtension[voxelSubstanceType] = ext;
 }

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

 registerTexture(
  voxelSubstanceType: VoxelSubstanceType,
  textureData: TextureData
 ) {
  this.textures[voxelSubstanceType].push(textureData);
 }
}
