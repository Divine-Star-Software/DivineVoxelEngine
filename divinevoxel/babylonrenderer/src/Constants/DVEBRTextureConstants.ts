import { Engine } from "@babylonjs/core/Engines/engine";
import {
  URITextureFormat,
  URITextureSamplingMode,
} from "@divinestar/uri/Constants/URITexturesConstants.js";
export const DVEBRTextureFormatMap: { [key in URITextureFormat]: number } = {
  [URITextureFormat.Alpha]: Engine.TEXTUREFORMAT_ALPHA,
  [URITextureFormat.Luminance]: Engine.TEXTUREFORMAT_LUMINANCE,
  [URITextureFormat.LuminanceAlpha]: Engine.TEXTUREFORMAT_LUMINANCE_ALPHA,
  [URITextureFormat.Red]: Engine.TEXTUREFORMAT_R,
  [URITextureFormat.RedInteger]: Engine.TEXTUREFORMAT_RED_INTEGER,
  [URITextureFormat.Rg]: Engine.TEXTUREFORMAT_RG,
  [URITextureFormat.Rgb]: Engine.TEXTUREFORMAT_RGB,
  [URITextureFormat.Rgba]: Engine.TEXTUREFORMAT_RGBA,
  [URITextureFormat.RgbaInteger]: Engine.TEXTUREFORMAT_RGBA_INTEGER,
  [URITextureFormat.RgbInteger]: Engine.TEXTUREFORMAT_RGB_INTEGER,
  [URITextureFormat.RgInteger]: Engine.TEXTUREFORMAT_RG_INTEGER,
};

export const DVEBRTextureSamplingModeMap: { [key in URITextureSamplingMode]: number } = {
  [URITextureSamplingMode.BilinearSamplingMode]:
    Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
  [URITextureSamplingMode.LinearLinear]: Engine.TEXTURE_LINEAR_LINEAR,
  [URITextureSamplingMode.LinearLinearMipLinear]:
    Engine.TEXTURE_LINEAR_LINEAR_MIPLINEAR,
  [URITextureSamplingMode.LinearLinearMipNearest]:
    Engine.TEXTURE_LINEAR_LINEAR_MIPNEAREST,
  [URITextureSamplingMode.LinearNearest]: Engine.TEXTURE_LINEAR_NEAREST,
  [URITextureSamplingMode.LinearNearestMipLinear]:
    Engine.TEXTURE_LINEAR_NEAREST_MIPLINEAR,
  [URITextureSamplingMode.LinearNearestMipNearest]:
    Engine.TEXTURE_LINEAR_NEAREST_MIPNEAREST,
  [URITextureSamplingMode.NearestLinear]: Engine.TEXTURE_NEAREST_LINEAR,
  [URITextureSamplingMode.NearestLinearMipLinear]:
    Engine.TEXTURE_NEAREST_LINEAR_MIPLINEAR,
  [URITextureSamplingMode.NearestLinearMipNearest]:
    Engine.TEXTURE_NEAREST_LINEAR_MIPNEAREST,
  [URITextureSamplingMode.NearestNearest]: Engine.TEXTURE_NEAREST_NEAREST,
  [URITextureSamplingMode.NearestNearestMipLinear]:
    Engine.TEXTURE_NEAREST_NEAREST_MIPLINEAR,
  [URITextureSamplingMode.NearestNearestMipNearest]:
    Engine.TEXTURE_NEAREST_NEAREST_MIPNEAREST,
  [URITextureSamplingMode.NearestSamplingMode]:
    Engine.TEXTURE_NEAREST_SAMPLINGMODE,
  [URITextureSamplingMode.TrilinearSamplingMode]:
    Engine.TEXTURE_TRILINEAR_SAMPLINGMODE,
};
