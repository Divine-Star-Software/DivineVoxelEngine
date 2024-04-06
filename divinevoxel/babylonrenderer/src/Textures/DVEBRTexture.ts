import {
  URITexture,
  URITextureData,
  URITexture2DArrayData,
} from "@divinestar/uri/Textures/URITexture.js";
import {
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "@divinestar/uri/Constants/URITexturesConstants.js";
import { RawTexture2DArray } from "@babylonjs/core/Materials/Textures/rawTexture2DArray.js";
import {
  DVEBRTextureFormatMap,
  DVEBRTextureSamplingModeMap,
} from "../Constants/DVEBRTextureConstants";
import { DVEBRScene } from "../Scene/DVEBRScene";

export class DVEBRTexture extends URITexture<DVEBRScene> {
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
    
      return new RawTexture2DArray(
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
          DVEBRTextureSamplingModeMap[URITextureSamplingMode.NearestLinearMipLinear]
      );
    }
    throw new Error(`Unsuppourted texture type`);
  }

  dispose(): void {
    this._texture.dispose();
  }
}
