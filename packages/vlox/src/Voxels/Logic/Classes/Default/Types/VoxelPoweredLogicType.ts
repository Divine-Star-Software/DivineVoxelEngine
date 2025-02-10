import { VoxelCursorInterface } from "../../../../../Voxels/Cursor/VoxelCursor.interface";
import { VoxelLogicType } from "../../VoxelLogicType";

export class VoxelPoweredLogicType extends VoxelLogicType {
  run(voxel: VoxelCursorInterface) {
    return voxel.getPower() > 0;
  }
}
