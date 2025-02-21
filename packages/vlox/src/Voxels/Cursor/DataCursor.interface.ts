import { VoxelCursorInterface } from "./VoxelCursor.interface";
export interface  DataCursorInterface {
   getVoxel(
    x: number,
    y: number,
    z: number
  ): VoxelCursorInterface | null;
   inBounds(x: number, y: number, z: number): boolean;

   clone() : DataCursorInterface;
}
