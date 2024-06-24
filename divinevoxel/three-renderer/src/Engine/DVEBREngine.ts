import type { WebGLRenderer } from "three";
import { URIEngine } from "@amodx/uri/Engine/URIEngine";
import { URITextureData } from "@amodx/uri/Textures/URITexture";
import { DVETRScene } from "../Scene/DVETRScene";
import { DVETRTexture } from "../Textures/DVETRTexture.js";

export class DVEBREngine extends URIEngine<WebGLRenderer> {
  createTexture(data: URITextureData<DVETRScene>): DVETRTexture {
    return new DVETRTexture(data);
  }
}
