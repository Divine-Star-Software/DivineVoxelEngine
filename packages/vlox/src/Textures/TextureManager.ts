import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import type { TextureData, TextureTypeUVMap } from "./Texture.types";
import { TextureBuilder } from "./TextureBuilder.js";
import { TextureArray } from "./TextureArray.js";
import { ConstructorTextureData } from "./Constructor.types";

export class TextureManager {
  static defaultTexturePath = "assets/textures";

  static textureTypes = new Map<string, TextureArray>();

  static getTextureIndex(data: ConstructorTextureData): number {
    const [textureType, textureId, varation] = data;

    const type = this.getTextureType(textureType);
    if (!type) return NaN;

    return type.getTextureIndex(textureId, varation);
  }

  static _ready = false;
  static isReady() {
    return this._ready;
  }

  static async $INIT() {
    TextureBuilder.defineTextureDimensions(
      EngineSettings.settings.textures.textureSize,
      EngineSettings.settings.textures.mipMapSizes
    );
    for (const [key, type] of this.textureTypes) {
      await type.build();
    }

    this._ready = true;
  }

  static generateTextureUVMap() {
    const uvMap: TextureTypeUVMap = {};
    for (const [key, type] of this.textureTypes) {
      uvMap[key] = type.getTextureIndexMap();
    }
    return uvMap;
  }

  static defineDefaultTexturePath(path: string) {
    this.defaultTexturePath = path;
  }

  static getTextureData([type, id, segment]: ConstructorTextureData):
    | TextureData
    | undefined {
    const t = this.getTextureType(type);
    if (!t) return undefined;

    return t.textureMap.get(id);
  }

  static getTextureType(id: string) {
    const texture = this.textureTypes.get(id);
    if (!texture) return false;
    return texture;
  }

  static getOrAddTextureType(id: string) {
    const texture = this.textureTypes.get(id);
    if (!texture) return this.addTextureType(id);
    return texture;
  }
  static addTextureType(id: string) {
    const newType = new TextureArray(id);
    this.textureTypes.set(id, newType);
    return newType;
  }

  static clearTextureData() {
    //
    //  this.textureTypes.forEach((_) => _.clearSegmentData());
  }

  static registerTexture(textureData: TextureData | TextureData[]) {
    if (Array.isArray(textureData)) {
      for (const texture of textureData) {
        const type = this.getOrAddTextureType(texture.type);
        if (!type) continue;
        type.addTexture(texture);
        continue;
      }
      return;
    }
    const type = this.getOrAddTextureType(textureData.type);
    if (!type) return;
    type.addTexture(textureData);
  }

  static getTexturePath(
    textureType: string,
    id: string,
    varation: string,
    segment = "main",
    frames?: number
  ) {
    const data = this.getTextureData([textureType, id, segment])!;
    if (!data)
      throw new Error(
        `Could not find data for ${textureType} ${id} ${varation}`
      );
    let path =
      data.base64 &&
      (Array.isArray(data.base64) ? data.base64[0] : data.base64);
    if (path) return path;

    const type = this.textureTypes.get(textureType)!;

    return type._getPath(data, varation, type.extension);
  }
  static async createCached() {
    const cachedTextureData: TextureData[] = [];
    for (const [typeKey, type] of this.textureTypes) {
      for (const baseData of type.textures) {
        const data = structuredClone(baseData);
        const id = baseData.id;
        if (data.frames) {
          const images: string[] = [];
          for (let i = 1; i <= data.frames; i++) {
            images.push(
              await TextureBuilder.getBase64(
                type._getPath(data, `${id}-${i}`, type.extension)
              )
            );
          }
          data.base64 = images;
        } else {
          data.base64 = await TextureBuilder.getBase64(
            type._getPath(data, "default", type.extension)
          );
        }
        if (data.variations) {
          for (const varId in data.variations) {
            const varation = data.variations[varId];
            if (varation.frames) {
              const images: string[] = [];
              for (let i = 1; i <= varation.frames; i++) {
                images.push(
                  await TextureBuilder.getBase64(
                    type._getPath(data, `${varId}-${i}`, type.extension)
                  )
                );
              }
              varation.base64 = images;
            } else {
              varation.base64 = await TextureBuilder.getBase64(
                type._getPath(data, varId, type.extension)
              );
            }
          }
        }
        cachedTextureData.push(data);
      }
    }
    return cachedTextureData;
  }
  static async createRawDataMap() {
    const map: Map<string, Uint8ClampedArray> = new Map();
    for (const [typeKey, type] of this.textureTypes) {
      for (const data of type.textures) {
        if (!data.includeInRawDataMap) continue;
        if (!data.path && !data.rawData) continue;
        const key = `${type.id}|${data.id}|default`;
        if (data.frames) {
          for (let i = 1; i <= data.frames; i++) {
            const rawData = await TextureBuilder.getRawData(
              type._getPath(data, `${key}-${i}`, type.extension)
            );

            data.rawData = rawData;
            map.set(`${key}-${i}`, rawData);
          }
        } else {
          const rawData = await TextureBuilder.getRawData(
            type._getPath(data, "default", type.extension)
          );

          data.rawData = rawData;

          map.set(key, rawData);
        }
        if (data.variations) {
          for (const varId in data.variations) {
            const varation = data.variations[varId];
            if (!varation.includeInRawDataMap) continue;
            const key = `${type.id}|${data.id}|${varId}`;
            if (data.frames) {
              for (let i = 1; i <= data.frames; i++) {
                const rawData = await TextureBuilder.getRawData(
                  type._getPath(data, `${key}-${i}`, type.extension)
                );
                data.rawData = rawData;
                map.set(`${key}-${i}`, rawData);
              }
            } else {
              const rawData = await TextureBuilder.getRawData(
                type._getPath(data, varId, type.extension)
              );
              data.rawData = rawData;
              map.set(key, rawData);
            }
          }
        }
      }
    }
    return map;
  }
}
TextureManager.getOrAddTextureType("#dve_voxel");
TextureManager.getOrAddTextureType("#dve_node");
