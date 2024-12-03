import { URIEngine } from "@amodx/uri/Engine/URIEngine";
import { URITextureData } from "@amodx/uri/Textures/URITexture";
import { DVEQRScene } from "../Scene/DVEQRScene.js";
import { DVEQRTexture } from "../Textures/DVEQRTexture.js";

export class DVEQREngine extends URIEngine<any> {
  createTexture(data: URITextureData<DVEQRScene>): DVEQRTexture {
    return new DVEQRTexture(data);
  }
}
