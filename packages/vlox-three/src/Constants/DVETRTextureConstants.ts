import {
  URITextureFormat,
  URITextureSamplingMode,
} from "@amodx/uri/Constants/URITexturesConstants.js";
import * as THREE from "three";

export const DVETRTextureFormatMap: { [key in URITextureFormat]: number } = {
  [URITextureFormat.Alpha]: THREE.AlphaFormat,
  [URITextureFormat.Luminance]: THREE.LuminanceFormat,
  [URITextureFormat.LuminanceAlpha]: THREE.LuminanceAlphaFormat,
  [URITextureFormat.Red]: THREE.RedFormat,
  [URITextureFormat.RedInteger]: -1,
  [URITextureFormat.Rg]: THREE.RGFormat,
  [URITextureFormat.Rgb]: THREE.RGBFormat,
  [URITextureFormat.Rgba]: THREE.RGBAFormat,
  [URITextureFormat.RgbaInteger]: -1,
  [URITextureFormat.RgbInteger]: -1,
  [URITextureFormat.RgInteger]: -1,
};
export const DVETRTextureSamplingModeMap: {
  [key in URITextureSamplingMode]: number;
} = {
  [URITextureSamplingMode.BilinearSamplingMode]: THREE.LinearFilter, // Closest match
  [URITextureSamplingMode.LinearLinear]: THREE.LinearFilter,
  [URITextureSamplingMode.LinearLinearMipLinear]:
    THREE.LinearMipmapLinearFilter,
  [URITextureSamplingMode.LinearLinearMipNearest]:
    THREE.LinearMipmapNearestFilter,
  [URITextureSamplingMode.LinearNearest]: THREE.NearestFilter, // Using NearestFilter for lack of a direct match
  [URITextureSamplingMode.LinearNearestMipLinear]:
    THREE.NearestMipmapLinearFilter,
  [URITextureSamplingMode.LinearNearestMipNearest]:
    THREE.NearestMipmapNearestFilter,
  [URITextureSamplingMode.NearestLinear]: THREE.LinearFilter, // Closest match
  [URITextureSamplingMode.NearestLinearMipLinear]:
    THREE.NearestMipmapLinearFilter,
  [URITextureSamplingMode.NearestLinearMipNearest]:
    THREE.NearestMipmapNearestFilter,
  [URITextureSamplingMode.NearestNearest]: THREE.NearestFilter,
  [URITextureSamplingMode.NearestNearestMipLinear]:
    THREE.NearestMipmapLinearFilter,
  [URITextureSamplingMode.NearestNearestMipNearest]:
    THREE.NearestMipmapNearestFilter,
  [URITextureSamplingMode.NearestSamplingMode]: THREE.NearestFilter,
  [URITextureSamplingMode.TrilinearSamplingMode]:
    THREE.LinearMipmapLinearFilter, // Closest match
};
