import { CompiledTexture } from "./Classes/CompiledTexture.js";
import {
  BuildTextureData,
  BuildTextureDataProps,
} from "./Functions/BuildTextureData.js";
import type { TextureData } from "./Texture.types";

export class TextureManager {
  static _textureTypes = new Map<string, TextureData[]>();
  static _compiledTextures = new Map<string, CompiledTexture>();
  static registerTexture(textureData: TextureData[]) {
    for (const texture of textureData) {
      const typeId = texture.type || "dve_voxel";
      let type = this._textureTypes.get(typeId);
      if (!type) {
        type = [];
        this._textureTypes.set(typeId, type);
      }
      type.push(texture);
    }
  }
  static getTexture(id: string) {
    const type = this._compiledTextures.get(id);
    if (!type) throw new Error(`Compiled texture with id ${id} does not exist`);
    return type;
  }

  static async compiledTextures(
    props: Omit<BuildTextureDataProps, "textures" | "type"> = {}
  ) {
    for (const [type, data] of this._textureTypes) {
      const compiled = await BuildTextureData({
        type,
        textures: data,
        ...props,
      });
      this._compiledTextures.set(type, compiled);
    }
  }
}
