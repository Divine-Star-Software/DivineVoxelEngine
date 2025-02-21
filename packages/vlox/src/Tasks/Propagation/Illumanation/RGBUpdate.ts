import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { CardinalNeighbors3D } from "../../../Math/CardinalNeighbors";
import {
  getMinusOneForRGB,
  isGreaterOrEqualThanForRGBRemove,
  isLessThanForRGBAdd,
  isLessThanForRGBRemove,
  removeRGBLight,
} from "./CommonFunctions";
//@todo change array to not use push and shift
export function RGBUpdate(tasks: VoxelUpdateTask) {
  const queue = tasks.rgb.update;
  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;
    const voxel = tasks.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;
    const sl = voxel.getLight();
    if (sl <= 0) continue;

    for (let i = 0; i < 6; i++) {
      const nx = CardinalNeighbors3D[i][0] + x;
      const ny = CardinalNeighbors3D[i][1] + y;
      const nz = CardinalNeighbors3D[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);

      if (!voxel) continue;
      const nl = voxel.getLight();

      if (nl > -1 && isLessThanForRGBAdd(nl, sl)) {
        queue.push(nx, ny, nz);
        voxel.setLight(getMinusOneForRGB(sl, nl));
      }
    }
    tasks.bounds.updateDisplay(x, y, z);
  }
}

export function RGBRemove(tasks: VoxelUpdateTask) {
  const remove = tasks.rgb.remove;
  const update = tasks.rgb.update;
  const removeMap = tasks.rgb.removeMap;
  const updateMap = tasks.sun.updateMap;
  while (remove.length) {
    const x = remove.shift()!;
    const y = remove.shift()!;
    const z = remove.shift()!;
    if (removeMap.has(x, y, z)) continue;
    removeMap.add(x, y, z);
    const voxel = tasks.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;
    const sl = voxel.getLight();
    if (sl <= 0) continue;

    for (let i = 0; i < 6; i++) {
      const nx = CardinalNeighbors3D[i][0] + x;
      const ny = CardinalNeighbors3D[i][1] + y;
      const nz = CardinalNeighbors3D[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (!voxel) continue;
      const nl = voxel.getLight();
      const n1HasRGB = voxel.hasRGBLight();
      if (n1HasRGB && isLessThanForRGBRemove(nl, sl)) {
        remove.push(nx, ny, nz);
        if (voxel.isLightSource()) {
          update.push(nx, ny, nz);
        }
      } else {
        if (
          n1HasRGB &&
          isGreaterOrEqualThanForRGBRemove(nl, sl) &&
          !updateMap.has(nx, ny, nz)
        ) {
          updateMap.add(nx, ny, nz);
          update.push(nx, ny, nz);
        }
      }
    }

    tasks.bounds.updateDisplay(x, y, z);
    voxel.setLight(removeRGBLight(sl));
  }
  removeMap.clear();
}
