import { Vec2Array } from "@amodx/math";
import { TextureId } from "../../Textures/Texture.types";
import { CompiledTextureAnimation } from "./CompiledTextureAnimation";

export class CompiledTexture {
  static GetAtlasIndex = (x: number, y: number, boundsX: number) =>
    x + y * boundsX;
  GetAtlasPosition = (index: number, boundsX: number, position: Vec2Array) => {
    position[1] = Math.floor(index / boundsX);
    position[0] = Math.floor(index % boundsX);
  };

  images: HTMLImageElement[] = [];

  atlasSizeMap: Record<string, [width: number, height: number]> = {};
  textureMap: Record<string, number> = {};
  animations: CompiledTextureAnimation[] = [];
  shaderTexture: any;

  constructor(public id: string) {}

  getTextureIndex(id: TextureId) {
    let finalId: string = "";
    let frameIndex = 0;
    if (!Array.isArray(id)) {
      finalId = id;
    }
    if (Array.isArray(id)) {
      finalId = id[0];
      if (typeof id[1] == "number") frameIndex = id[1];
      if (Array.isArray(id[1]))
        frameIndex = CompiledTexture.GetAtlasIndex(
          id[1][0],
          id[1][1],
          this.atlasSizeMap[finalId][0]
        );
      if (typeof id[1] == "string") {
        finalId = `${id[0]}:${id[1]}`;
        if (typeof id[2] == "number") frameIndex = id[2];
        if (Array.isArray(id[2]))
          frameIndex = CompiledTexture.GetAtlasIndex(
            id[2][0],
            id[2][1],
            this.atlasSizeMap[finalId][0]
          );
      }
    }
    const index = this.textureMap[finalId];
    if (index === undefined) {
      throw new Error(
        `Texture with id [passed in: ${id.toString()}] [final: ${finalId}] does not exist on compiled texture`
      );
    }
    return index + frameIndex;
  }

  getTexturePath(id: TextureId) {
    return this.images[this.getTextureIndex(id)].src;
  }
}
