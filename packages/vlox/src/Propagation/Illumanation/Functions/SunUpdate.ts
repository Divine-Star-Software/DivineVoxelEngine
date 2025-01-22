import { UpdateTask } from "../../../Contexts/Constructor/Tasks/UpdateTask";
import { LightData } from "../../../VoxelData/LightData";
import { Vec3Array } from "@amodx/math";
const FloodOutPositions: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
];
export function SunUpdate(tasks: UpdateTask) {
  const queue = tasks.sun.update;
  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;
    const voxel = tasks.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;
    const sl = voxel.getLight();
    if (sl <= 0) continue;

    for (let i = 0; i < 5; i++) {
      const nx = FloodOutPositions[i][0] + x;
      const ny = FloodOutPositions[i][1] + y;
      const nz = FloodOutPositions[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && LightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(nx, ny, nz);
          nVoxel.setLight(LightData.getMinusOneForSun(sl, nl));
        }
      }
    }
    if (tasks.nDataCursor.inBounds(x, y - 1, z)) {
      const nVoxel = tasks.nDataCursor.getVoxel(x, y - 1, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && LightData.isLessThanForSunAddDown(nl, sl)) {
          if (nVoxel.isAir()) {
            queue.push(x, y - 1, z);
            nVoxel.setLight(LightData.getSunLightForUnderVoxel(sl, nl));
          } else {
            if (!nVoxel.isOpaque()) {
              queue.push(x, y - 1, z);
              nVoxel.setLight(LightData.getMinusOneForSun(sl, nl));
            }
          }
        }
      }
    }

    tasks.bounds.update(x, y, z);
  }
}

export function SunRemove(tasks: UpdateTask, clearUpdateMap = true) {
  const remove = tasks.sun.remove;
  const update = tasks.sun.update;
  const removeMap = tasks.sun.removeMap;
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

    for (let i = 0; i < 5; i++) {
      const nx = FloodOutPositions[i][0] + x;
      const ny = FloodOutPositions[i][1] + y;
      const nz = FloodOutPositions[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > 0) {
          if (LightData.isLessThanForSunRemove(nl, sl)) {
            remove.push(nx, ny, nz);
          } else if (
            LightData.isGreaterOrEqualThanForSunRemove(nl, sl) &&
            !updateMap.has(nx, ny, nz)
          ) {
            updateMap.add(nx, ny, nz);
            update.push(nx, ny, nz);
          }
        }
      }
    }

    if (tasks.nDataCursor.inBounds(x, y - 1, z)) {
      const nVoxel = tasks.nDataCursor.getVoxel(x, y - 1, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > 0) {
          if (LightData.sunLightCompareForDownSunRemove(nl, sl)) {
            remove.push(x, y - 1, z);
          } else if (
            LightData.isGreaterOrEqualThanForSunRemove(nl, sl) &&
            !updateMap.has(x, y - 1, z)
          ) {
            updateMap.add(x, y - 1, z);
            update.push(x, y - 1, z);
          }
        }
      }
    }

    tasks.bounds.update(x, y, z);
    voxel.setLight(LightData.removeSunLight(sl));
  }
  removeMap.clear();
}
