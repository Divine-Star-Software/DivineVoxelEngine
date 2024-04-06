import { URIScene } from "../Scenes/URIScene.js";
import { URITexture } from "../Textures/URITexture.js";

export interface URIMaterialData<
  Scene extends URIScene = URIScene,
  Data extends object = any
> {
  scene: Scene;
  uniforms?: string[];
  attributes?: string[];
  samplers?: string[];
  defines?: string[];
  data: Data;
  alphaTesting?: boolean;
  alphaBlending?: boolean;
  mipMapBias?: number;
  hasEffects?: boolean;
  backFaceCulling?: boolean;
}

export abstract class URIMaterial<
  Scene extends URIScene = URIScene,
  Data extends object = any,
  InternalMaterial extends any = unknown
> {
  _material: InternalMaterial;

  abstract id: string;

  abstract _create(data: URIMaterialData<Scene, Data>): InternalMaterial;
  abstract setTextureArray(samplerId: string, sampler: URITexture[]): void;
  abstract setTexture(samplerId: string, sampler: URITexture): void;
  abstract setNumber(uniform: string, value: number): void;
  abstract setNumberArray(uniform: string, value: ArrayLike<number>): void;
  abstract setVector2(uniform: string, x: number, y: number): void;
  abstract setVector3(uniform: string, x: number, y: number, z: number): void;
  abstract setVector4(
    uniform: string,
    x: number,
    y: number,
    z: number,
    w: number
  ): void;
  abstract setMatrix<MatrixType = any>(
    uniform: string,
    matrix: MatrixType
  ): void;
}
