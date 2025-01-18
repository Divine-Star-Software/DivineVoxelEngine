import { VoxelCursorInterface } from "./VoxelCursor.interface";
export abstract class DataCursorInterface {
  abstract getVoxel(
    x: number,
    y: number,
    z: number
  ): VoxelCursorInterface | null;
  abstract inBounds(x: number, y: number, z: number): boolean;
}
