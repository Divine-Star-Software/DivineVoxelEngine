import { VoxelPickResult } from "../Interaction/VoxelPickResult";
import { VoxelCursorInterface } from "./VoxelCursor.interface";
import { Vec3Array, Vector3Like } from "@amodx/math";

export interface DataCursorInterface {
  getVoxel(x: number, y: number, z: number): VoxelCursorInterface | null;
  inBounds(x: number, y: number, z: number): boolean;

  clone(): DataCursorInterface;
}
