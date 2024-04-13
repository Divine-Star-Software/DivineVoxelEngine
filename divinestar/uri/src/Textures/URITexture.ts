import {
  URITextureAddressMode,
  URITextureCoordinateMode,
  URITextureDataType,
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "../Constants/URITexturesConstants.js";
import { URIScene } from "../Scenes/URIScene.js";

interface BaseURITextureData<Scene extends URIScene = URIScene<any>> {
  width: number;
  height: number;
  scene: Scene;
  format?: URITextureFormat;
  dataType?: URITextureDataType;
  samplingMode?: URITextureSamplingMode;
  addressingMode?: URITextureAddressMode;
  coordinateMode?: URITextureCoordinateMode;
}

export interface URITexture2DData<Scene extends URIScene = URIScene<any>>
  extends BaseURITextureData<Scene> {
  data: string | ArrayLike<number>;
  type: URITextureTypes.Texture2D;
}
export interface URITexture2DArrayData<Scene extends URIScene = URIScene<any>>
  extends BaseURITextureData<Scene> {
  data: string[] | ArrayLike<ArrayLike<number>>;
  type: URITextureTypes.Texture2DArray;
  layers: number;
}
export interface URITexture3DData<Scene extends URIScene = URIScene<any>>
  extends BaseURITextureData<Scene> {
  data: string[] | ArrayLike<ArrayLike<number>>;
  type: URITextureTypes.Texture3D;
  layers: number;
}

export type URITextureData<Scene extends URIScene = URIScene<any>> =
  | URITexture2DData<Scene>
  | URITexture2DArrayData<Scene>
  | URITexture3DData<Scene>;

export interface URITexturee extends BaseURITextureData {}

export abstract class URITexture<
  Scene extends URIScene = URIScene<any>,
  InteralTexture extends any = any
> {
  _texture: InteralTexture | null = null;
  constructor(data: URITextureData<Scene>) {
    this._create(data);


  }
  abstract _create(data: URITextureData<Scene>): InteralTexture;
  abstract dispose(): void;
}
