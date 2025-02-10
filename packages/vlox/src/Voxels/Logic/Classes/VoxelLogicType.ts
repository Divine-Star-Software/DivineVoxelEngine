import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface";
import { VoxelUpdateTask } from "../../../Tasks/VoxelUpdateTask";

export abstract class VoxelLogicType {
  abstract run(task: VoxelCursorInterface): boolean;
}
