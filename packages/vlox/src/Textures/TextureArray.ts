import type { TextureData } from "./Texture.types";
import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader";
import { TextureManager } from "./TextureManager.js";
import { TextureAnimationCreator } from "./TextureAnimations.js";
import { TextureBuilder } from "./TextureBuilder.js";
//import { DVENodeMaterial } from "../Materials/NodeMaterial.js";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";
import { URITexture } from "@amodx/uri/Textures/URITexture";

export class TextureArray {
  extension = "png";
  totalTextures = 0;
  textureMap = new Map<string, TextureData>();
  textures: TextureData[] = [];
  textureIndex: Record<string, number> = {};
  animationsMap: number[][] = [];
  animationTimes: number[][] = [];
  animations: {
    uniformIndex: number;
    overlay?: boolean;
    keys: number[];
    currentFrame: number;
    currentCount: number;
    keyCounts: number[];
  }[] = [];
  varyingID = "";
  animationUniforID = "";
  animationUniform: Float32Array = new Float32Array();
  paths: Map<string, HTMLImageElement | string | false> = new Map();
  images: HTMLImageElement[] = [];
  /* actual renderer resource */
  shaderTexture: any|null = null;
  textureID = "";
  materials: Map<string, URIMaterial> = new Map();
  attributeID = "textureIndex";
  constructor(public id: string) {
    this.textureID = id.replace("#", "");
  }
  /**# clearData
   * ---
   * Clear all un-needed data.
   */
  clearData() {
    this.paths.clear();
    this.textures = [];
    this.textureMap.clear();
    this.textureIndex = {};
    this.images = [];
    this.animationsMap = [];
    this.animationTimes = [];
  }
  /**# flush
   * ---
   * Clear all data.
   */
  flush() {
    this.clearData();

    this.images = [];
    this.animations = [];
    this.animationTimes = [];
    this.animationsMap = [];
    this.textureIndex = {};
    this.totalTextures = 0;
  }
  flushAll() {
    this.materials.clear();
  }

  async build() {
    this.buildTextureIndex();

    if (this.paths.size) {
      this.images = await TextureBuilder.createMaterialTexture(
        this.id,
        this.paths
      );
    }

    TextureAnimationCreator.createAnimations(this);
  }

  getTextureIndex(textureId: string, varation: string = "") {
    let id = textureId;
    if (varation) {
      id = `${textureId}:${varation}`;
    }
    let uv = -1;
    uv = this.textureIndex[id];
    if (uv == -1) {
      throw new Error(
        `Texture with id: ${id} does not exists.typeId : ${this.id} `
      );
    }
    return uv;
  }

  addTexture(data: TextureData) {
    this.textures.push(data);
    this.textureMap.set(data.id, data);
  }

  runAnimations() {
    for (let i = 0; i < this.animations.length; i++) {
      const anim = this.animations[i];
      if (anim.currentCount <= anim.keyCounts[anim.currentFrame]) {
        anim.currentCount++;
        continue;
      }
      anim.currentCount = 0;
      if (anim.currentFrame < anim.keys.length - 1) {
        anim.currentFrame++;
      } else {
        anim.currentFrame = 0;
      }
      this.animationUniform[anim.uniformIndex] = anim.keys[anim.currentFrame];
      for (const [key, material] of this.materials) {
        material!.setNumberArray(
          this.animationUniforID,
          this.animationUniform as any
        );
      }
    }
  }

  getTextureIndexMap() {
    return this.textureIndex;
  }

  _processVariations(
    textureData: TextureData,
    paths: Map<string, HTMLImageElement | string | false>,
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
        let raw: Uint8ClampedArray | string | false = false;
        if (data.base64 && !Array.isArray(data.base64)) {
          raw = data.base64;
        }
        paths.set(assetPath, raw);
        count++;
      } else {
        if (!data.animKeys)
          throw new Error(
            "Texture Varation must have supplied animKeys if frames are greater than 0."
          );

        for (let i = 1; i <= data.frames; i++) {
          map[`${textureData.id}:${varation}-${i}`] = count;
          const assetPath = this._getPath(
            textureData,
            `${varation}-${i}`,
            extension
          );
          let raw: Uint8ClampedArray | string | false = false;
          if (data.base64) {
            raw = data.base64[i - 1];
          }
          paths.set(assetPath, raw);
          count++;
        }

        const trueKeys: number[] = [];
        for (let i = 0; i < data.animKeys.length; i++) {
          trueKeys.push(
            map[`${textureData.id}:${varation}-${data.animKeys[i]}`]
          );
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
  }

  _getPath(textureData: TextureData, varation = "default", extension: string) {
    return `${
      textureData.path ? textureData.path : TextureManager.defaultTexturePath
    }/${textureData.id}/${varation}.${extension}`;
  }

  buildTextureIndex() {
    const texture = this;
    if (!texture) return false;

    const extension = texture.extension;

    let count = 0;
    const map = this.textureIndex;
    const paths = this.paths;
    const animationTimes: number[][] = this.animationTimes;
    const animations: number[][] = this.animationsMap;

    for (const textureData of this.textures) {
      if (textureData.frames == 0) {
        this.textureIndex[`${textureData.id}`] = count;
        const assetPath = this._getPath(textureData, "default", extension);
        let raw: Uint8ClampedArray | string | false = false;
        if (textureData.base64 && !Array.isArray(textureData.base64)) {
          raw = textureData.base64;
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
          const assetPath = this._getPath(
            textureData,
            `default-${i}`,
            extension
          );
          let raw: Uint8ClampedArray | string | false = false;

          if (textureData.base64) {
            raw = textureData.base64[i - 1];
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

    this.totalTextures = count;
  }
}
