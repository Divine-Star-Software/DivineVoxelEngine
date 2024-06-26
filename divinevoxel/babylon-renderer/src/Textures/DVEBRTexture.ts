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
import type { Engine, Texture } from "@babylonjs/core";
import { TextureBuilder } from "@divinevoxel/foundation/Textures/TextureBuilder";

export class DVEBRTexture extends URITexture<DVEBRScene, Texture> {
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
        //gen mip maps
        true,
        //invert y
        false,
        (textureData.samplingMode !== undefined &&
          DVEBRTextureSamplingModeMap[textureData.samplingMode]) ||
          DVEBRTextureSamplingModeMap[
            URITextureSamplingMode.NearestLinearMipLinear
          ]
      );

      (async () => {
        const engine = data.scene._scene.getEngine() as Engine;

        const { width, height, layers } = textureData;
        texture._noMipmap = false;
        const iTexture = texture._texture!;
        iTexture.generateMipMaps = true;
        iTexture.useMipMaps = true;
        engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, iTexture);

        let w = width,
          h = height,
          mipMapLevel = 0;
        while (w >= 1 && h >= 1) {
          if (mipMapLevel < 3) {
            TextureBuilder.context!.imageSmoothingEnabled = false;
          } else {
            TextureBuilder.context!.imageSmoothingEnabled = true;
          }
          const mip = await TextureBuilder._createMipMap(
            mipMapLevel,
            (data as any).images,
            w,
            h
          );

          const gl = engine._gl;
          const textureType = engine._getWebGLTextureType(iTexture.type);
          const format = engine._getInternalFormat(iTexture.format);
          const internalFormat = engine._getRGBABufferInternalSizedFormat(
            iTexture.type,
            iTexture.format,
            iTexture._useSRGBBuffer
          );

          engine._unpackFlipY(texture.invertY);

          console.log(w, h);
          let target = gl.TEXTURE_2D_ARRAY;

          gl.texImage3D(
            target,
            mipMapLevel,
            internalFormat,
            w,
            h,
            layers + 2,
            0,
            format,
            textureType,
            mip
          );
          w /= 2;
          h /= 2;
          mipMapLevel++;
        }

        iTexture.width = width;
        iTexture.height = height;
        iTexture.isReady = true;
        //  iTexture.samplingMode = Texture.NEAREST_NEAREST_MIPLINEAR;
        engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, null);
        texture._texture = iTexture;
      })();

      this._texture = texture;
      return texture;
    }
    throw new Error(`Unsuppourted texture type`);
  }

  dispose(): void {
    this._texture?.dispose();
    this._texture = null;
  }
}
