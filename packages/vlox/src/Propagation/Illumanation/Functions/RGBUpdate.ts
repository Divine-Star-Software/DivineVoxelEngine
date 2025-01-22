import { UpdateTask } from "../../../Contexts/Constructor/Tasks/UpdateTask";
import { $3dCardinalNeighbors } from "../../../Math/Constants/CardinalNeighbors";
import { LightData } from "../../../VoxelData/LightData";
//@todo change array to not use push and shift
export function RGBUpdate(tasks: UpdateTask) {
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
      const nx = $3dCardinalNeighbors[i][0] + x;
      const ny = $3dCardinalNeighbors[i][1] + y;
      const nz = $3dCardinalNeighbors[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);

      if (!voxel) continue;
      const nl = voxel.getLight();

      if (nl > -1 && LightData.isLessThanForRGBAdd(nl, sl)) {
        queue.push(nx, ny, nz);
        voxel.setLight(LightData.getMinusOneForRGB(sl, nl));
      }
    }
    tasks.bounds.update(x, y, z);
  }
}

export function RGBRemove(tasks: UpdateTask) {
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
      const nx = $3dCardinalNeighbors[i][0] + x;
      const ny = $3dCardinalNeighbors[i][1] + y;
      const nz = $3dCardinalNeighbors[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (!voxel) continue;
      const nl = voxel.getLight();
      const n1HasRGB = LightData.hasRGBLight(nl);
      if (n1HasRGB && LightData.isLessThanForRGBRemove(nl, sl)) {
        remove.push(nx, ny, nz);
        if (voxel.isLightSource()) {
          update.push(nx, ny, nz);
        }
      } else {
        if (
          n1HasRGB &&
          LightData.isGreaterOrEqualThanForRGBRemove(nl, sl) &&
          !updateMap.has(nx, ny, nz)
        ) {
          updateMap.add(nx, ny, nz);
          update.push(nx, ny, nz);
        }
      }
    }

    tasks.bounds.update(x, y, z);
    voxel.setLight(LightData.removeRGBLight(sl));
  }
  removeMap.clear();
}
