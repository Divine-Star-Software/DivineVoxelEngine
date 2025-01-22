import { Material, Matrix, Scene, Texture } from "@babylonjs/core";
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
  clone(scene: Scene): MaterialInterface;
  setNumber(uniform: string, value: number): void;
  setNumberArray(uniform: string, value: ArrayLike<number>): void;
  setVector2(uniform: string, x: number, y: number): void;
  setVector3(uniform: string, x: number, y: number, z: number): void;
  setVector4(uniform: string, x: number, y: number, z: number, w: number): void;
  setMatrix<MatrixType = Matrix>(uniform: string, matrix: MatrixType): void;
}
