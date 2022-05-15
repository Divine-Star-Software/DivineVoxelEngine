import type { TextureData } from "Meta/Render/Textures/Texture.types";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
import type { TextureProccesedData } from "Meta/Render/Textures/Texture.types";

export const TextureManager = {
 defaultTexturePath: "",

 processedTextureData: <TextureProccesedData>{},
 textureData: <TextureData>{},

 textureExtension: <Record<VoxelSubstanceType, string>>{
  solid: "png",
  transparent: "png",
  fluid: "png",
  magma: "png",
  flora: "png",
 },

 textures: <Record<VoxelSubstanceType, TextureData[]>>{
  solid: [],
  transparent: [],
  fluid: [],
  magma: [],
  flora: [],
 },

 uvTextureMap: <Record<VoxelSubstanceType, Record<string, number>>>{
  solid: {},
  transparent: {},
  fluid: {},
  magma: {},
  flora: {},
 },

 _processVariations(
  texture: TextureData,
  texturePaths: string[],
  animations: Record<VoxelSubstanceType, number[][]>,
  textureAnimatioTimes: Record<VoxelSubstanceType, number[][]>,
  extension: string,
  count: number,
  path: string,
  substance: VoxelSubstanceType
 ) {
  if (!texture.varations) return count;
  for (const varation of Object.keys(texture.varations)) {
   const data = texture.varations[varation];
   if (data.frames == 0) {
    this.uvTextureMap[substance][`${texture.id}:${varation}`] = count;
    texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
    count++;
   } else {
    if (!data.animKeys)
     throw new Error(
      "Texture Varation must have supplied animKeys if frames are greater than 0."
     );
    for (let i = 1; i <= data.frames; i++) {
     this.uvTextureMap[substance][`${texture.id}:${varation}-${i}`] = count;
     texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
     count++;
    }

    const trueKeys: number[] = [];
    for (let i = 0; i < data.animKeys.length; i++) {
     trueKeys.push(
      this.uvTextureMap[substance][
       `${texture.id}:${varation}-${data.animKeys[i]}`
      ]
     );
    }
    if (data.animKeyFrameTimes) {
     textureAnimatioTimes[substance].push(data.animKeyFrameTimes);
    }
    if (data.globalFrameTime) {
     textureAnimatioTimes[substance].push([data.globalFrameTime]);
    }
    animations[substance].push(trueKeys);
   }
  }

  return count;
 },
 generateTexturesData() {
  const returnTexturePaths: Record<VoxelSubstanceType, string[]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
  };
  const textureAnimatioTimes: Record<VoxelSubstanceType, number[][]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
  };
  const animations: Record<VoxelSubstanceType, number[][]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
  };
  const substances: VoxelSubstanceType[] = [
   "transparent",
   "fluid",
   "solid",
   "magma",
   "flora",
  ];

  for (const substance of substances) {
   let texturePaths: string[] = [];

   let count = 1;
   const extension = this.textureExtension[substance];
   for (const texture of this.textures[substance]) {
    let path: string = texture.path ? texture.path : this.defaultTexturePath;
    if (texture.frames == 0) {
     this.uvTextureMap[substance][`${texture.id}`] = count;
     texturePaths.push(`${path}/${texture.id}/default.${extension}`);
     count++;
     count = this._processVariations(
      texture,
      texturePaths,
      animations,
      textureAnimatioTimes,
      extension,
      count,
      path,
      substance
     );
    } else {
     if (!texture.animKeys)
      throw new Error(
       "Texture must have supplied animKeys if frames are greater than 0."
      );
     this.uvTextureMap[substance][`${texture.id}`] = count;
     for (let i = 1; i < texture.frames; i++) {
      texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
      count++;
     }
     const trueKeys: number[] = [];
     for (let i = 0; i < texture.animKeys.length; i++) {
      trueKeys.push(
       this.uvTextureMap[substance][
        `${texture.id}:default-${texture.animKeys[i]}`
       ]
      );
     }

     if (texture.animKeyFrameTimes) {
      textureAnimatioTimes[substance].push(texture.animKeyFrameTimes);
     }
     if (texture.globalFrameTime) {
      textureAnimatioTimes[substance].push([texture.globalFrameTime]);
     }
     animations[substance].push(trueKeys);
     count = this._processVariations(
      texture,
      texturePaths,
      animations,
      textureAnimatioTimes,
      extension,
      count,
      path,
      substance
     );
    }
   }

   returnTexturePaths[substance] = texturePaths;
  }

  this.processedTextureData = {
   textureAnimationTimes: textureAnimatioTimes,
   textureAnimations: animations,
   texturePaths: returnTexturePaths,
  };
  return this.processedTextureData;
 },

 defineDefaultTexturePath(path: string) {
  this.defaultTexturePath = path;
 },

 defineDefaultTextureExtension(
  voxelSubstanceType: VoxelSubstanceType,
  ext: string
 ) {
  this.textureExtension[voxelSubstanceType] = ext;
 },

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
 },

 registerTexture(
  voxelSubstanceType: VoxelSubstanceType,
  textureData: TextureData
 ) {
  this.textures[voxelSubstanceType].push(textureData);
 },
};
