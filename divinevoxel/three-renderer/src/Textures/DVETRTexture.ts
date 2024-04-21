import * as THREE from "three";
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
import {
  DVETRTextureFormatMap,
  DVETRTextureSamplingModeMap,
} from "../Constants/DVETRTextureConstants";
import { DVETRScene } from "../Scene/DVETRScene";

export class DVETRTexture extends URITexture<DVETRScene, THREE.Texture> {
  _create(data: URITextureData<DVETRScene>) {
    if (data.type == URITextureTypes.Texture2DArray) {
      const textureData = data as URITexture2DArrayData<DVETRScene>;

      if (!ArrayBuffer.isView(textureData.data)) {
        throw new Error(
          `DataTexture2DArray requires an array buffer view. Received type: ${typeof textureData.data}`
        );
      }

      const format =
        textureData.format !== undefined
          ? DVETRTextureFormatMap[textureData.format]
          : THREE.RGBAFormat;
      const type =
        textureData.data instanceof Uint8Array ||
        textureData.data instanceof Uint8ClampedArray
          ? THREE.UnsignedByteType
          : THREE.FloatType;
      // Correctly create a DataTexture2DArray instance
      const texture = new THREE.DataArrayTexture(
        textureData.data,
        textureData.width,
        textureData.height,
        textureData.layers
      );
      texture.format = format as any;
      texture.type = type;
      texture.minFilter = (
        textureData.samplingMode !== undefined
          ? DVETRTextureSamplingModeMap[textureData.samplingMode]
          : THREE.LinearMipmapLinearFilter
      ) as any;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      this._texture = texture;

      return texture;
    }
    throw new Error(`Unsupported texture type: ${data.type}`);
  }

  dispose(): void {
    this._texture?.dispose();
  }
}
