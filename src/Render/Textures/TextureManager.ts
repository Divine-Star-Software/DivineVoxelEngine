import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import type {
 TextureData,
 TextureTypeUVMap,
} from "Meta/Render/Textures/Texture.types";
import { TextureCreator } from "./TextureCreator.js";
import { TextureType } from "./TextureType.js";
import { TextureAnimationCreator } from "./TextureAnimations.js";
import { ConstructorTextureData } from "Meta/index.js";

export const TextureManager = {
 defaultTexturePath: "",

 textureTypes: <Map<string, TextureType>>new Map(),

 uvMap: <TextureTypeUVMap>{},
 getTextureUV(data: ConstructorTextureData, overlay: boolean = false): number {
  const [textureType, textureId, varation] = data;
  let id = textureId;
  if (varation) {
   id = `${textureId}:${varation}`;
  }
  let uv = -1;
  if (!overlay) {
   uv = this.uvMap[textureType]["main"][id];
  } else {
   uv = this.uvMap[textureType]["overlay"][id];
  }
  if (uv == -1) {
   throw new Error(
    `Texture with id: ${id} does not exists. Overlay : ${overlay}`
   );
  }
  return uv;
 },

 _processVariations(
  textureData: TextureData,
  paths: Map<string, Uint8ClampedArray | false>,
  map: Record<string, number>,
  animations: number[][],
  textureAnimatioTimes: number[][],
  extension: string,
  count: number
 ) {
  if (!textureData.variations) return count;
  for (const varation of Object.keys(textureData.variations)) {
   const data = textureData.variations[varation];
   if (data.frames == 0) {
    map[`${textureData.id}:${varation}`] = count;

    const assetPath = this._getPath(textureData, varation, extension);
    let raw: Uint8ClampedArray | false = false;
    if (data.rawData && !Array.isArray(raw)) {
     raw = <Uint8ClampedArray>data.rawData;
    }
    paths.set(assetPath, raw);
    count++;
   } else {
    if (!data.animKeys)
     throw new Error(
      "Texture Varation must have supplied animKeys if frames are greater than 0."
     );
    const rawData = data.rawData;
    for (let i = 1; i <= data.frames; i++) {
     map[`${textureData.id}:${varation}-${i}`] = count;
     const assetPath = this._getPath(
      textureData,
      `${varation}-${i}`,
      extension
     );
     let raw: Uint8ClampedArray | false = false;
     if (rawData) {
      raw = <Uint8ClampedArray>rawData[i - 1];
     }
     paths.set(assetPath, raw);
     count++;
    }

    const trueKeys: number[] = [];
    for (let i = 0; i < data.animKeys.length; i++) {
     trueKeys.push(map[`${textureData.id}:${varation}-${data.animKeys[i]}`]);
    }
    if (data.animKeyFrameTimes) {
     textureAnimatioTimes.push(data.animKeyFrameTimes);
    }
    if (data.globalFrameTime) {
     textureAnimatioTimes.push([data.globalFrameTime]);
    }

    animations.push(trueKeys);
   }
  }

  return count;
 },
 _getPath(textureData: TextureData, varation = "default", extension: string) {
  return `${textureData.path ? textureData.path : this.defaultTexturePath}/${
   textureData.id
  }/${varation}.${extension}`;
 },
 generateTexturesData(id: string) {
  const texture = this.textureTypes.get(id);
  if (!texture) return false;

  const extension = texture.extension;

  for (const [key, segment] of texture.textureSegments) {
   let count = 1;
   const map = segment.textureMap;
   const paths = segment.paths;
   const animationTimes: number[][] = segment.animationTimes;
   const animations: number[][] = segment.animationsMap;

   for (const textureData of segment.textures) {
    if (textureData.frames == 0) {
     segment.textureMap[`${textureData.id}`] = count;
     const assetPath = this._getPath(textureData, "default", extension);
     let raw: Uint8ClampedArray | false = false;
     if (textureData.rawData && !Array.isArray(raw)) {
      raw = <Uint8ClampedArray>textureData.rawData;
     }
     paths.set(assetPath, raw);
     count++;
     count = this._processVariations(
      textureData,
      paths,
      map,
      animations,
      animationTimes,
      extension,
      count
     );
    } else {
     if (!textureData.animKeys)
      throw new Error(
       "Texture must have supplied animKeys if frames are greater than 0."
      );

     const rawData = textureData.rawData;
     for (let i = 1; i <= textureData.frames; i++) {
      const assetPath = this._getPath(textureData, `default-${i}`, extension);
      let raw: Uint8ClampedArray | false = false;
      if (rawData) {
       raw = <Uint8ClampedArray>rawData[i - 1];
      }
      paths.set(assetPath, raw);
      count++;
     }
     const trueKeys: number[] = [];
     for (let i = 0; i < textureData.animKeys.length; i++) {
      trueKeys.push(
       map[`${textureData.id}:default-${textureData.animKeys[i]}`]
      );
     }

     if (textureData.animKeyFrameTimes) {
      animationTimes.push(textureData.animKeyFrameTimes);
     }
     if (textureData.globalFrameTime) {
      animationTimes.push([textureData.globalFrameTime]);
     }
     animations.push(trueKeys);
     count = this._processVariations(
      textureData,
      paths,
      map,
      animations,
      animationTimes,
      extension,
      count
     );
    }
   }

   segment.totalTextures = count;
  }
 },

 _ready: false,
 isReady() {
  return this._ready;
 },

 async $INIT() {
  TextureCreator.defineTextureDimensions(
   EngineSettings.settings.textures.textureSize,
   EngineSettings.settings.textures.mipMapSizes
  );
  for (const [key, type] of this.textureTypes) {
   this.generateTexturesData(key);
   for (const [skey, segment] of type.textureSegments) {
    segment.texture = await TextureCreator.createMaterialTexture(
     skey,
     segment.paths
    );
   }
   TextureAnimationCreator.createAnimations(type);
  }

  this._ready = true;
 },

 $START_ANIMATIONS() {
  setInterval(() => {
   for (const [key, type] of this.textureTypes) {
    type.runAnimations();
   }
  }, 50);
 },

 generateTextureUVMap() {
  const uvMap: TextureTypeUVMap = {};
  for (const [key, type] of this.textureTypes) {
   uvMap[key] = type.getTextureUVMap();
  }
  this.uvMap = uvMap;
  return uvMap;
 },

 defineDefaultTexturePath(path: string) {
  this.defaultTexturePath = path;
 },

 getTextureType(id: string) {
  const texture = this.textureTypes.get(id);
  if (!texture) return false;
  return texture;
 },

 addTextureType(id: string) {
  this.textureTypes.set(id, new TextureType(id));
 },

 clearTextureData() {
  this.textureTypes.forEach((_) => _.clearSegmentData());
 },

 registerTexture(textureData: TextureData | TextureData[]) {
  if (Array.isArray(textureData)) {
   for (const texture of textureData) {
    const type = this.getTextureType(texture.type);
    if (!type) continue;
    type.addTexture(texture);
    continue;
   }
   return;
  }
  const type = this.getTextureType(textureData.type);
  if (!type) return;
  type.addTexture(textureData);
 },

 async createRawDataMap() {
  const map: Map<string, Uint8ClampedArray> = new Map();
  for (const [typeKey, type] of this.textureTypes) {
   for (const [segKey, segment] of type.textureSegments) {
    for (const data of segment.textures) {
     if (!data.includeInRawDataMap) continue;
     if (!data.path && !data.rawData) continue;
     const key = `${type.id}|${data.id}|default`;
     if (data.frames) {
      for (let i = 1; i <= data.frames; i++) {
       const rawData = await TextureCreator.loadImage(
        data.rawData
         ? <Uint8ClampedArray>data.rawData[i - 1]
         : this._getPath(data, `${key}-${i}`, type.extension)
       );

       map.set(`${key}-${i}`, rawData);
      }
     } else {
      const rawData = await TextureCreator.loadImage(
       data.rawData
        ? <Uint8ClampedArray>data.rawData
        : this._getPath(data, "default", type.extension)
      );

      map.set(key, rawData);
     }
     if (data.variations) {
      for (const varId in data.variations) {
       const varation = data.variations[varId];
       if (!varation.includeInRawDataMap) continue;
       const key = `${type.id}|${data.id}|${varId}`;
       if (data.frames) {
        for (let i = 1; i <= data.frames; i++) {
         const rawData = await TextureCreator.loadImage(
          data.rawData
           ? <Uint8ClampedArray>data.rawData[i - 1]
           : this._getPath(data, `${key}-${i}`, type.extension)
         );

         map.set(`${key}-${i}`, rawData);
        }
       } else {
        const rawData = await TextureCreator.loadImage(
         data.rawData
          ? <Uint8ClampedArray>data.rawData
          : this._getPath(data, varId, type.extension)
        );
        map.set(key, rawData);
       }
      }
     }
    }
   }
  }
  return map;
 },
};

TextureManager.addTextureType("#dve_solid");
TextureManager.addTextureType("#dve_flora");
TextureManager.addTextureType("#dve_liquid");
