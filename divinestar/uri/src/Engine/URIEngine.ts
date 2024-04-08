import type { URITexture, URITextureData } from "../Textures/URITexture.js";

export abstract class URIEngine<Engine extends any = unknown> {
  _engine: Engine;
  abstract createTexture(data: URITextureData): URITexture;
}
