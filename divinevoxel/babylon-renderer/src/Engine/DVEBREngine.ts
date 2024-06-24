import type { Engine } from "@babylonjs/core";
import { URIEngine } from "@amodx/uri/Engine/URIEngine";
import { URITextureData } from "@amodx/uri/Textures/URITexture";
import { DVEBRScene } from "../Scene/DVEBRScene.js";
import { DVEBRTexture } from "../Textures/DVEBRTexture.js";

export class DVEBREngine extends URIEngine<Engine> {
  createTexture(data: URITextureData<DVEBRScene>): DVEBRTexture {
    return new DVEBRTexture(data);
  }
}
