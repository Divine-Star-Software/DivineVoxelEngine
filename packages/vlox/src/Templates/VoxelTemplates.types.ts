import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { RawVoxelData } from "Voxels";

export interface IVoxelTemplate<
  Type extends string = "",
  Data extends IVoxelTemplateData<Type> = any,
> {
  bounds: Vec3Array;
  index: Flat3DIndex;
  getIndex(x: number, y: number, z: number): number;
  isAir(index: number): boolean;
  isIncluded(index: number): boolean;
  getId(index: number): number;
  getLevel(index: number): number;
  getLight(index: number): number;
  getSecondary(index: number): number;

  getRaw(index: number, rawRef?: RawVoxelData): RawVoxelData;
  toJSON(): Data;
}

export interface IVoxelTemplateData<Type extends string> {
  type: Type;
  bounds: Vec3Array;
}

export interface IVoxelTemplateConstructor<
  Type extends string,
  Data extends IVoxelTemplateData<Type> = any,
> {
  new (data: Data): IVoxelTemplate<Type, Data>;
}
