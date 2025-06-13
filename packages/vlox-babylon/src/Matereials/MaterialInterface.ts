import { Material } from "@babylonjs/core/Materials/material";
import { Matrix } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { SceneOptions } from "../Scene/SceneOptions";
export interface MaterialData<Data extends object = any> {
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
  stencil?: boolean;
}

export interface MaterialInterface<
  Data extends MaterialData<any> = MaterialData<any>,
> {
  _material: Material;

  id: string;
  data: Data;
  createMaterial(scene: Scene): MaterialInterface | false;

  _create(data: Data): void;

  setTextureArray(samplerId: string, sampler: Texture[]): void;
  textures: Map<string, Texture>;

  setTexture(samplerId: string, sampler: Texture): void;
  clone(scene: Scene, options: SceneOptions): MaterialInterface;
  setNumber(uniform: string, value: number): void;
  setNumberArray(uniform: string, value: ArrayLike<number>): void;
  setVector2(uniform: string, x: number, y: number): void;
  setVector3(uniform: string, x: number, y: number, z: number): void;
  setVector4(uniform: string, x: number, y: number, z: number, w: number): void;
  setMatrix<MatrixType = Matrix>(uniform: string, matrix: MatrixType): void;
}
