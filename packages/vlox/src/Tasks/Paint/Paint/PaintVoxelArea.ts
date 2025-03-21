import { PaintVoxelAreaTask } from "../../Tasks.types";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { canUpdate, updateArea } from "../Common";

const tasks = new VoxelUpdateTask();

export default function PaintVoxelArea([
  dimension,
  [sx, sy, sz],
  [ex, ey, ez],
  raw,
  updateData,
]: PaintVoxelAreaTask) {
  tasks.setOriginAt([dimension, sx, sy, sz]);
  raw[1] = 0;
  for (let x = sx; x < ex; x++) {
    for (let y = sy; y < ey; y++) {
      for (let z = sz; z < ez; z++) {
        if (!canUpdate(x, y, z, updateData)) continue;
        if (!tasks.sDataCursor.inBounds(x, y, z)) continue;
        const voxel = tasks.sDataCursor.getVoxel(x, y, z);
        if (!voxel) continue;
        voxel.setRaw(raw);
        voxel.updateVoxel(0);
      }
    }
  }

  updateArea(tasks, sx, sy, sz, ex, ey, ez);

  return tasks;
}
