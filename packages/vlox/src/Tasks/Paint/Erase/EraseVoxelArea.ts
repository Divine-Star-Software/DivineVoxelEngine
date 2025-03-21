import { EraseVoxelAreaTask } from "../../Tasks.types";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { canUpdate, updateArea } from "../Common";

const tasks = new VoxelUpdateTask();

export default function EraseVoxelArea(data: EraseVoxelAreaTask) {
  const [dimension, [sx, sy, sz], [ex, ey, ez], updateData] = data;

  tasks.setOriginAt([dimension, sx, sy, sz]);

  for (let x = sx; x < ex; x++) {
    for (let y = sy; y < ey; y++) {
      for (let z = sz; z < ez; z++) {
        if (!tasks.sDataCursor.inBounds(x, y, z)) continue;
        const voxel = tasks.sDataCursor.getVoxel(x, y, z);
        if (!voxel) continue;
        if (!canUpdate(x, y, z, updateData)) continue;
        voxel.ids[voxel._index] = 0;
        voxel.level[voxel._index] = 0;
        voxel.secondary[voxel._index] = 0;
        voxel.light[voxel._index] = 0;
        voxel.updateVoxel(1);
      }
    }
  }

  updateArea(tasks, sx, sy, sz, ex, ey, ez);

  return tasks;
}
