import { EraseVoxelPathTask, VoxelUpdateData } from "../../Tasks.types";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { canUpdate, updateArea } from "../Common";

import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelPath } from "../../../Templates/Path/VoxelPath";
import { VoxelPathData } from "../../../Templates/Path/VoxelPath.types";

const tasks = new VoxelUpdateTask();
const min = Vector3Like.Create();
const max = Vector3Like.Create();

const updateBounds = (x: number, y: number, z: number) => {
  if (x < min.x) min.x = x;
  if (y < min.y) min.y = y;
  if (z < min.z) min.z = z;

  if (x > max.x) max.x = x;
  if (y > max.y) max.y = y;
  if (z > max.z) max.z = z;
};
export default function EraseVoxelPath(
  dimension: number,
  [ox,oy,oz]: Vec3Array,
  voxelPathData: VoxelPathData,
  updateData: VoxelUpdateData
) {
  tasks.setOriginAt([dimension, ox, oy, oz]);
  const path = new VoxelPath(voxelPathData);

  for (let i = 0; i < path.segments.length; i++) {
    const { start, end, voxel } = path.segments[i];
    min.x = Infinity;
    min.y = Infinity;
    min.z = Infinity;
    max.x = -Infinity;
    max.y = -Infinity;
    max.z = -Infinity;
    const [sx, sy, sz] = start;
    const [ex, ey, ez] = end;

    const dx = ex - sx;
    const dy = ey - sy;
    const dz = ez - sz;

    const steps = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
    if (steps === 0) {
      if (!canUpdate(sx, sy, sz, updateData)) continue;
      const voxel = tasks.nDataCursor.getVoxel(sx, sy, sz);
      if (!voxel) continue;
      voxel.ids[voxel._index] = 0;
      voxel.level[voxel._index] = 0;
      voxel.secondary[voxel._index] = 0;
      voxel.light[voxel._index] = 0;
      voxel.updateVoxel(1);
      updateArea(tasks, sx, sy, sz, sx, sy, sz);
      continue;
    }

    const stepX = dx / steps;
    const stepY = dy / steps;
    const stepZ = dz / steps;

    let x = sx;
    let y = sy;
    let z = sz;

    for (let step = 0; step <= steps; step++) {
      const vx = Math.floor(x);
      const vy = Math.floor(y);
      const vz = Math.floor(z);
      x += stepX;
      y += stepY;
      z += stepZ;
      if (!canUpdate(vx, vy, vz, updateData)) continue;

      const voxel = tasks.nDataCursor.getVoxel(vx, vy, vz);
      if (!voxel) continue;
      voxel.ids[voxel._index] = 0;
      voxel.level[voxel._index] = 0;
      voxel.secondary[voxel._index] = 0;
      voxel.light[voxel._index] = 0;
      voxel.updateVoxel(1);
      updateBounds(vx, vy, vz);
    }

    updateArea(tasks, min.x, min.y, min.z, max.x, max.y, max.z);
  }
}
