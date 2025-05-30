import { Flat3DIndex, Vector3Like } from "@amodx/math";
import { BoundingBox } from "@amodx/math/Geomtry/Bounds/BoundingBox";
import { RawVoxelData } from "../Voxels/Types/Voxel.types";

export interface IVoxelTemplate<
  Type extends string = "",
  Data extends IVoxelTemplateData<Type> = any,
> {
  position: Vector3Like;
  bounds: BoundingBox;
  index: Flat3DIndex;
  setPosition(x: number, y: number, z: number): void;
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
  position: Vector3Like;
  bounds: Vector3Like;
}

export interface IVoxelTemplateConstructor<
  Type extends string,
  Data extends IVoxelTemplateData<Type> = any,
> {
  new (data: Data): IVoxelTemplate<Type, Data>;
}
