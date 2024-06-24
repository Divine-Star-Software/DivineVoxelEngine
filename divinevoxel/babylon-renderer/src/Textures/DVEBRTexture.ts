import {
  URITexture,
  URITextureData,
  URITexture2DArrayData,
} from "@amodx/uri/Textures/URITexture.js";
import {
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "@amodx/uri/Constants/URITexturesConstants.js";
import { RawTexture2DArray } from "@babylonjs/core/Materials/Textures/rawTexture2DArray.js";
import {
  DVEBRTextureFormatMap,
  DVEBRTextureSamplingModeMap,
} from "../Constants/DVEBRTextureConstants";
import { DVEBRScene } from "../Scene/DVEBRScene";
import type { Texture } from "@babylonjs/core";

export class DVEBRTexture extends URITexture<DVEBRScene,Texture> {
  _create(data: URITextureData<DVEBRScene>) {
    if (data.type == URITextureTypes.Texture2D) {
    }
    if (data.type == URITextureTypes.Texture2DArray) {
      const textureData = data as URITexture2DArrayData;
      let rawData: Uint8ClampedArray | null = null;
      if (textureData.data instanceof Uint8ClampedArray) {
        rawData = textureData.data;
      }

      if (!rawData)
        throw new Error(
          `Could not create Raw2DTextureArray invalid data. ${data}`
        );

      const texture = new RawTexture2DArray(
        rawData,
        textureData.width,
        textureData.height,
        textureData.layers,
        (textureData.format !== undefined &&
          DVEBRTextureFormatMap[textureData.format]) ||
          DVEBRTextureFormatMap[URITextureFormat.Rgba],
        textureData.scene._scene,
        true,
        false,
        (textureData.samplingMode !== undefined &&
          DVEBRTextureSamplingModeMap[textureData.samplingMode]) ||
          DVEBRTextureSamplingModeMap[
            URITextureSamplingMode.NearestLinearMipLinear
          ]
      );

      this._texture = texture;
      return texture;
    }
    throw new Error(`Unsuppourted texture type`);
  }

  dispose(): void {
    this._texture?.dispose();
    this._texture =  null;
  }
}
