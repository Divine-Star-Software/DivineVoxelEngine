import { URIMaterialData } from "@amodx/uri/Materials/URIMaterial";
import { URIScene } from "@amodx/uri/Scenes/URIScene";
import { URITexture } from "@amodx/uri/Textures/URITexture";
import { NodeMaterialData } from "@divinevoxel/vlox/Renderer/DVERenderNode.types";

export class DVEQMaterial {
  constructor(
    public id: string,
    public data: NodeMaterialData
  ) {}

  _create(data: URIMaterialData<URIScene<unknown>, any>): unknown {
    //  throw new Error("Method not implemented.");
    return {} as any;
  }
  setTextureArray(samplerId: string, sampler: URITexture[]): void {
    //  throw new Error("Method not implemented.");
  }
  setTexture(samplerId: string, sampler: URITexture): void {
    //   throw new Error("Method not implemented.");
  }
  setNumber(uniform: string, value: number): void {
    //   throw new Error("Method not implemented.");
  }
  setNumberArray(uniform: string, value: ArrayLike<number>): void {
    //   throw new Error("Method not implemented.");
  }
  setVector2(uniform: string, x: number, y: number): void {
    //    throw new Error("Method not implemented.");
  }
  setVector3(uniform: string, x: number, y: number, z: number): void {
    //   throw new Error("Method not implemented.");
  }
  setVector4(
    uniform: string,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    //  throw new Error("Method not implemented.");
  }
  setMatrix<MatrixType = any>(uniform: string, matrix: MatrixType): void {
    //    throw new Error("Method not implemented.");
  }
}
