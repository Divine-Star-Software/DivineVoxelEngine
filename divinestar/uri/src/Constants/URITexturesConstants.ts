export enum URITextureTypes {
  Texture2D,
  TextureCubeMap,
  Texture3D,
  Texture2DArray,
  TextureDepth,
  TextureDepthStencil,
  TextureFloat,
  TextureHalfFloat,
}

export enum URITextureFormat {
  Alpha,
  Luminance,
  LuminanceAlpha,
  Red,
  RedInteger,
  Rg,
  Rgb,
  Rgba,
  RgbaInteger,
  RgbInteger,
  RgInteger,
}

export enum URITextureDataType {
  Byte,
  Float,
  Float32UnsignedInt248Rev,
  HalfFloat,
  Int,
  Short,
  UnsignedByte,
  UnsignedInt,
  UnsignedInt10F11F11FRev,
  UnsignedInt248,
  UnsignedInt2101010Rev,
  UnsignedInt5999Rev,
  UnsignedShort,
  UnsignedShort4444,
  UnsignedShort5551,
  UnsignedShort565,
}

export enum URITextureSamplingMode {
  BilinearSamplingMode,
  LinearLinear,
  LinearLinearMipLinear,
  LinearLinearMipNearest,
  LinearNearest,
  LinearNearestMipLinear,
  LinearNearestMipNearest,
  NearestLinear,
  NearestLinearMipLinear,
  NearestLinearMipNearest,
  NearestNearest,
  NearestNearestMipLinear,
  NearestNearestMipNearest,
  NearestSamplingMode,
  TrilinearSamplingMode,
}

export enum URITextureAddressMode {
  ClampAddressMode,
  ExplicitMode,
  MirrorAddressMode,
  WrapAddressMode,
}

export enum URITextureCoordinateMode {
  CubicMode,
  EquirectangularMode,
  FixedEquirectangularMirroredMode,
  FixedEquirectangularMode,
  InvCubicMode,
  PlanarMode,
  ProjectionMode,
  SkyboxMode,
  SphericalMode,
}
