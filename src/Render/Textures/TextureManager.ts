import type { TextureData } from "Meta/Render/Textures/Texture.types";
import type { TextureProccesedData,TextureTypes } from "Meta/Render/Textures/Texture.types";


export const TextureManager = {
 defaultTexturePath: "",

 processedTextureData: <TextureProccesedData>{},
 overlayProcessedTextureData: <TextureProccesedData>{},
 textureData: <TextureData>{},

 textureExtension: <Record<TextureTypes, string>>{
  solid: "png",
  transparent: "png",
  fluid: "png",
  magma: "png",
  flora: "png",
  Item: "png",
 },

 textures: <Record<TextureTypes, TextureData[]>>{
  solid: [],
  transparent: [],
  fluid: [],
  magma: [],
  flora: [],
  Item: [],
 },

 uvTextureMap: <Record<TextureTypes, Record<string, number>>>{
  solid: {},
  transparent: {},
  fluid: {},
  magma: {},
  flora: {},
  Item: {},
 },

 overylayTextures: <Record<TextureTypes, TextureData[]>>{
  solid: [],
  transparent: [],
  fluid: [],
  magma: [],
  flora: [],
  Item: [],
 },

 overlayUVTextureMap: <Record<TextureTypes, Record<string, number>>>{
  solid: {},
  transparent: {},
  fluid: {},
  magma: {},
  flora: {},
  Item: {},
 },

 textureTypes: <TextureTypes[]>[
  "transparent",
  "fluid",
  "solid",
  "magma",
  "flora",
  "Item",
 ],

 _processVariations(
  texture: TextureData,
  texturePaths: string[],
  animations: Record<TextureTypes, number[][]>,
  textureAnimatioTimes: Record<TextureTypes, number[][]>,
  extension: string,
  count: number,
  path: string,
  textureType: TextureTypes,
  overlay = false
 ) {
  let map = this.uvTextureMap;
  if (overlay) {
   map = this.overlayUVTextureMap;
  }

  if (!texture.variations) return count;
  for (const varation of Object.keys(texture.variations)) {
   const data = texture.variations[varation];
   if (data.frames == 0) {
    map[textureType][`${texture.id}:${varation}`] = count;
    texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
    count++;
   } else {
    if (!data.animKeys)
     throw new Error(
      "Texture Varation must have supplied animKeys if frames are greater than 0."
     );
    for (let i = 1; i <= data.frames; i++) {
     map[textureType][`${texture.id}:${varation}-${i}`] = count;
     texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
     count++;
    }

    const trueKeys: number[] = [];
    for (let i = 0; i < data.animKeys.length; i++) {
     trueKeys.push(
      map[textureType][`${texture.id}:${varation}-${data.animKeys[i]}`]
     );
    }
    if (data.animKeyFrameTimes) {
     textureAnimatioTimes[textureType].push(data.animKeyFrameTimes);
    }
    if (data.globalFrameTime) {
     textureAnimatioTimes[textureType].push([data.globalFrameTime]);
    }
    animations[textureType].push(trueKeys);
   }
  }

  return count;
 },
 generateTexturesData(overlay = false) {
  const returnTexturePaths: Record<TextureTypes, string[]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
   Item: [],
  };
  const textureAnimatioTimes: Record<TextureTypes, number[][]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
   Item: [],
  };
  const animations: Record<TextureTypes, number[][]> = {
   solid: [],
   transparent: [],
   magma: [],
   fluid: [],
   flora: [],
   Item: [],
  };

  let textures = this.textures;
  if (overlay) {
   textures = this.overylayTextures;
  }

  let map = this.uvTextureMap;
  if (overlay) {
   map = this.overlayUVTextureMap;
  }

  for (const textureType of this.textureTypes) {
   let texturePaths: string[] = [];

   let count = 1;
   const extension = this.textureExtension[textureType];
   for (const texture of textures[textureType]) {
    let path: string = texture.path ? texture.path : this.defaultTexturePath;
    if (texture.frames == 0) {
     map[textureType][`${texture.id}`] = count;
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
      textureType,
      overlay
     );
    } else {
     if (!texture.animKeys)
      throw new Error(
       "Texture must have supplied animKeys if frames are greater than 0."
      );
     map[textureType][`${texture.id}`] = count;
     for (let i = 1; i < texture.frames; i++) {
      texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
      count++;
     }
     const trueKeys: number[] = [];
     for (let i = 0; i < texture.animKeys.length; i++) {
      trueKeys.push(
       map[textureType][`${texture.id}:default-${texture.animKeys[i]}`]
      );
     }

     if (texture.animKeyFrameTimes) {
      textureAnimatioTimes[textureType].push(texture.animKeyFrameTimes);
     }
     if (texture.globalFrameTime) {
      textureAnimatioTimes[textureType].push([texture.globalFrameTime]);
     }
     animations[textureType].push(trueKeys);
     count = this._processVariations(
      texture,
      texturePaths,
      animations,
      textureAnimatioTimes,
      extension,
      count,
      path,
      textureType
     );
    }
   }

   returnTexturePaths[textureType] = texturePaths;
  }

  if (!overlay) {
   this.processedTextureData = {
    textureAnimationTimes: textureAnimatioTimes,
    textureAnimations: animations,
    texturePaths: returnTexturePaths,
   };
  } else {
   this.overlayProcessedTextureData = {
    textureAnimationTimes: textureAnimatioTimes,
    textureAnimations: animations,
    texturePaths: returnTexturePaths,
   };
  }
 },

 defineDefaultTexturePath(path: string) {
  this.defaultTexturePath = path;
 },

 defineDefaultTextureExtension(textureType: TextureTypes, ext: string) {
  this.textureExtension[textureType] = ext;
 },

 getTextureUV(
  textureType: TextureTypes,
  textureId: string,
  varation?: string
 ): number {
  let id = textureId;
  if (varation) {
   id = `${textureId}:${varation}`;
  }

  return this.uvTextureMap[textureType][id];
 },

 registerTexture(textureType: TextureTypes, textureData: TextureData) {
  if (!textureData.overlay) {
   this.textures[textureType].push(textureData);
   return;
  }
  this.overylayTextures[textureType].push(textureData);
 },
};
