import { VoxelFaceNames } from "../../../Math";
import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface";

export interface VoxelUpdate {
  priority: number;
  source: VoxelCursorInterface;
  direction: VoxelFaceNames;
  x: number;
  y: number;
  z: number;
}
