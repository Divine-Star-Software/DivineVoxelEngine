import { EraseVoxelPathTask } from "../../Tasks.types";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { canUpdate, updateArea } from "../Common";
import { RawVoxelData } from "../../../Voxels";

const tasks = new VoxelUpdateTask();

const raw: RawVoxelData = [0, 0, 0, 0];
export default function EraseVoxelPath([
  dimension,
  [ox, oy, oz],
  templateData,
  updateData,
]: EraseVoxelPathTask) {
  tasks.setOriginAt([dimension, ox, oy, oz]);


}
