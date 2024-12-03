import {
  URITextureFormat,
  URITextureSamplingMode,
} from "@amodx/uri/Constants/URITexturesConstants.js";
export const DVEQRTextureFormatMap: { [key in URITextureFormat]: number } = {
  [URITextureFormat.Alpha]: 0,
  [URITextureFormat.Luminance]: 0,
  [URITextureFormat.LuminanceAlpha]: 0,
  [URITextureFormat.Red]: 0,
  [URITextureFormat.RedInteger]: 0,
  [URITextureFormat.Rg]: 0,
  [URITextureFormat.Rgb]: 0,
  [URITextureFormat.Rgba]: 0,
  [URITextureFormat.RgbaInteger]: 0,
  [URITextureFormat.RgbInteger]: 0,
  [URITextureFormat.RgInteger]: 0,
};

export const DVEQRTextureSamplingModeMap: {
  [key in URITextureSamplingMode]: number;
} = {
  [URITextureSamplingMode.BilinearSamplingMode]: 0,
  [URITextureSamplingMode.LinearLinear]: 0,
  [URITextureSamplingMode.LinearLinearMipLinear]: 0,
  [URITextureSamplingMode.LinearLinearMipNearest]: 0,
  [URITextureSamplingMode.LinearNearest]: 0,
  [URITextureSamplingMode.LinearNearestMipLinear]: 0,
  [URITextureSamplingMode.LinearNearestMipNearest]: 0,
  [URITextureSamplingMode.NearestLinear]: 0,
  [URITextureSamplingMode.NearestLinearMipLinear]: 0,
  [URITextureSamplingMode.NearestLinearMipNearest]: 0,
  [URITextureSamplingMode.NearestNearest]: 0,
  [URITextureSamplingMode.NearestNearestMipLinear]: 0,
  [URITextureSamplingMode.NearestNearestMipNearest]: 0,
  [URITextureSamplingMode.NearestSamplingMode]: 0,
  [URITextureSamplingMode.TrilinearSamplingMode]: 0,
};
