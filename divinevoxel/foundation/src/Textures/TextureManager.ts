import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import type { TextureData, TextureTypeUVMap } from "./Texture.types";
import { TextureBuilder } from "./TextureBuilder.js";
import { TextureType } from "./TextureType.js";
import { ConstructorTextureData } from "./Constructor.types";

export class TextureManager {
  static defaultTexturePath = "assets/textures";

  static textureTypes = new Map<string, TextureType>();

  static getTextureIndex(
    data: ConstructorTextureData,
    overlay: boolean = false
  ): number {
    const [textureType, textureId, varation] = data;

    const type = this.getTextureType(textureType);
    if (!type) return NaN;

    return type.getTextureIndex(
      textureId,
      varation,
      overlay ? "overlay" : "main"
    );
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

  static $START_ANIMATIONS() {
    setInterval(() => {
      for (const [key, type] of this.textureTypes) {
        type.runAnimations();
      }
    }, 50);
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
    let s = segment ? t.segments.get(segment) : t.segments.get("main")!;
    if (!s) return undefined;
    return s.textureMap.get(id);
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
    const newType = new TextureType(id);
    this.textureTypes.set(id, newType);
    return newType;
  }

  static clearTextureData() {
    this.textureTypes.forEach((_) => _.clearSegmentData());
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

  static getRaw([type, id, segment]: ConstructorTextureData) {}

  static async createRawDataMap() {
    const map: Map<string, Uint8ClampedArray> = new Map();
    for (const [typeKey, type] of this.textureTypes) {
      for (const [segKey, segment] of type.segments) {
        for (const data of segment.textures) {
          if (!data.includeInRawDataMap) continue;
          if (!data.path && !data.rawData) continue;
          const key = `${type.id}|${data.id}|default`;
          if (data.frames) {
            for (let i = 1; i <= data.frames; i++) {
              const rawData = await TextureBuilder.loadImage(
                data.rawData
                  ? <Uint8ClampedArray>data.rawData[i - 1]
                  : type._getPath(data, `${key}-${i}`, type.extension),
                TextureBuilder._textureSize,
                TextureBuilder._textureSize
                //  undefined,
                //  false
              );

              data.rawData = rawData;
              map.set(`${key}-${i}`, rawData);
            }
          } else {
            if (data.rawData instanceof Uint8ClampedArray) {
              map.set(key, data.rawData);
              continue;
            }
            const rawData = await TextureBuilder.loadImage(
              type._getPath(data, "default", type.extension),
              TextureBuilder._textureSize,
              TextureBuilder._textureSize
              //  undefined,
              //  false
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
                  const rawData = await TextureBuilder.loadImage(
                    data.rawData
                      ? <Uint8ClampedArray>data.rawData[i - 1]
                      : type._getPath(data, `${key}-${i}`, type.extension),
                    TextureBuilder._textureSize,
                    TextureBuilder._textureSize,
                    undefined,
                    false
                  );
                  data.rawData = rawData;
                  map.set(`${key}-${i}`, rawData);
                }
              } else {
                const rawData = await TextureBuilder.loadImage(
                  data.rawData
                    ? <Uint8ClampedArray>data.rawData
                    : type._getPath(data, varId, type.extension),
                  TextureBuilder._textureSize,
                  TextureBuilder._textureSize,
                  undefined,
                  false
                );
                data.rawData = rawData;

                map.set(key, rawData);
              }
            }
          }
        }
      }
    }

    return map;
  }
}
