import { Vector3Like } from "@amodx/math";

export interface IVoxelSelection {
  origin: Vector3Like;
  size: Vector3Like;
  isSelected(x: number, y: number, z: number): boolean;
}
