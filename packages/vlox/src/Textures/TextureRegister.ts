import type { TextureTypeUVMap, TextureId } from "./Texture.types";

export class TextureRegister {
  static textureDataHasBeenSet = false;

  static data: TextureTypeUVMap;
  static getTextureUV(data: TextureId): number {
    const [textureType, textureId, varation] = data;
    let id = textureId;
    if (varation) {
      id = `${textureId}:${varation}`;
    }
    let uv = -1;

    uv = this.data[textureType][id];

    if (uv == -1) {
      throw new Error(`Texture with id: ${id} does not exists.`);
    }
    return uv;
  }

  static setTextureIndex(data: TextureTypeUVMap) {
    this.textureDataHasBeenSet = true;
    this.data = data;
  }

  static releaseTextureData() {
    (this as any).data = null;
    delete (this as any)["data"];
  }

  static isReady() {
    return this.textureDataHasBeenSet;
  }
}
