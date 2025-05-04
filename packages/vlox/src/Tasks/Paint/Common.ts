import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { VoxelLightData } from "../../Voxels/Cursor/VoxelLightData.js";
import { VoxelUpdateData } from "../../Tasks/Tasks.types.js";
import {
  RGBRemove,
  RGBUpdate,
  SunRemove,
  SunUpdate,
} from "../Propagation/index.js";

export const updatePowerTask = (tasks: VoxelUpdateTask) => {
  const [dimension, x, y, z] = tasks.origin;
  tasks.nDataCursor.setFocalPoint(dimension, x, y, z);
  for (const n of CardinalNeighbors3D) {
    const nx = n[0] + x;
    const ny = n[1] + y;
    const nz = n[2] + z;
    const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
    if (!nVoxel) continue;
    if (nVoxel.getPower() > 0) {
      tasks.power.update.push(nx, ny, nz);
    }
  }
};

const lightData = new VoxelLightData();

export const canUpdate = (
  x: number,
  y: number,
  z: number,
  data: VoxelUpdateData
): boolean => {
  const { includedAreas, excludeAreas } = data;

  // Check if includedAreas is set and not empty
  if (includedAreas && includedAreas.length > 0) {
    let insideIncluded = false;
    for (let i = 0; i < includedAreas.length; i++) {
      const min = includedAreas[i][0];
      const max = includedAreas[i][1];

      if (
        x >= min[0] &&
        x <= max[0] &&
        y >= min[1] &&
        y <= max[1] &&
        z >= min[2] &&
        z <= max[2]
      ) {
        insideIncluded = true;
        break;
      }
    }
    if (!insideIncluded) return false;
  }

  // Check if excludeAreas is set and not empty
  if (excludeAreas && excludeAreas.length > 0) {
    for (let i = 0; i < excludeAreas.length; i++) {
      const min = excludeAreas[i][0];
      const max = excludeAreas[i][1];

      if (
        x >= min[0] &&
        x <= max[0] &&
        y >= min[1] &&
        y <= max[1] &&
        z >= min[2] &&
        z <= max[2]
      ) {
        return false;
      }
    }
  }

  return true;
};

/**Checks if the given voxel needs a light update and adds it to the needed queues */
export const checkLightUpdate = (
  x: number,
  y: number,
  z: number,
  tasks: VoxelUpdateTask
) => {
  let needSunRemove = false;
  let needSunUpdate = false;

  let needRGBRemove = false;
  let needRGBUpdate = false;

  const voxel = tasks.nDataCursor.getVoxel(x, y, z)!;
  const lightValue = voxel.getLight();

  const sunValue = lightData.getS(lightValue);

  if (sunValue == 15) {
    const voxel = tasks.nDataCursor.getVoxel(x, y + 1, z);
    if (voxel) {
      const light = voxel.getLight();
      const v = lightData.getS(light);
      if (light < 0 || v != 15) {
        needSunRemove = true;
      }
    }
  }

  const redValue = lightData.getR(lightValue);
  const greenValue = lightData.getG(lightValue);
  const blueValue = lightData.getB(lightValue);

  const hasSunLight = sunValue > 0;
  const hasRGBLight = voxel.hasRGBLight();
  let foundHigherSun = false;
  let foundHigherRed = false;
  let foundHigherGreen = false;
  let foundHigherBlue = false;
  let lowestSunValue = Infinity;
  let lowestRedValue = Infinity;
  let lowestGreenValue = Infinity;
  let lowestBlueValue = Infinity;
  for (let i = 0; i < CardinalNeighbors3D.length; i++) {
    const n = CardinalNeighbors3D[i];
    const nx = n[0] + x;
    const ny = n[1] + y;
    const nz = n[2] + z;
    const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
    if (!nVoxel) continue;
    const nLight = nVoxel.getLight();
    if (nLight === -1) continue;

    if (hasSunLight) {
      const nSunValue = lightData.getS(nLight);
      if (nSunValue < lowestSunValue) {
        lowestSunValue = nSunValue;
      }
      if (nSunValue > sunValue) {
        foundHigherSun = true;
      }
    }

    if (hasRGBLight) {
      const nRedValue = lightData.getR(nLight);
      if (nRedValue > lowestRedValue) {
        lowestRedValue = nRedValue;
      }
      if (nRedValue > redValue) {
        foundHigherRed = true;
      }

      const nGreenValue = lightData.getG(nLight);
      if (nGreenValue < lowestGreenValue) {
        lowestGreenValue = nGreenValue;
      }
      if (nGreenValue > greenValue) {
        foundHigherGreen = true;
      }

      const nBlueValue = lightData.getB(nLight);
      if (nBlueValue > lowestBlueValue) {
        lowestBlueValue = nBlueValue;
      }
      if (nBlueValue < blueValue) {
        foundHigherBlue = true;
      }
    }
  }
  if (hasSunLight) {
    //sun
    if (sunValue != 15 && sunValue != 0 && !foundHigherSun) {
      needSunRemove = true;
    }
    if (
      (foundHigherSun || sunValue == 15) &&
      lowestSunValue < sunValue - VoxelLightData.SunFallOffValue
    ) {
      needSunUpdate = true;
    }
  }
  if (hasRGBLight) {
    //red
    if (redValue != 15 && !foundHigherRed) {
      needRGBRemove = true;
    }
    if ((foundHigherRed || redValue == 15) && lowestRedValue < redValue - 1) {
      needRGBUpdate = true;
    }

    //green
    if (greenValue != 15 && !foundHigherGreen) {
      needRGBRemove = true;
    }
    if (
      (foundHigherGreen || greenValue == 15) &&
      lowestGreenValue < greenValue - 1
    ) {
      needRGBUpdate = true;
    }

    //blue
    if (blueValue != 15 && !foundHigherBlue) {
      needRGBRemove = true;
    }
    if (
      (foundHigherBlue || blueValue == 15) &&
      lowestBlueValue < blueValue - 1
    ) {
      needRGBUpdate = true;
    }
  }
  if (needSunRemove) {
    tasks.sun.remove.push(x, y, z);
  }

  if (needSunUpdate && !needSunRemove) {
    tasks.sun.update.push(x, y, z);
  }

  if (needRGBRemove) {
    tasks.rgb.remove.push(x, y, z);
  }

  if (needRGBUpdate && !needRGBRemove) {
    tasks.rgb.update.push(x, y, z);
  }
};

export const updateArea = (
  tasks: VoxelUpdateTask,
  sx: number,
  sy: number,
  sz: number,
  ex: number,
  ey: number,
  ez: number
) => {

  for (let x = sx - 1; x < ex + 1; x++) {
    for (let y = sy - 1; y < ey + 1; y++) {
      for (let z = sz - 1; z < ez + 1; z++) {
        const voxel = tasks.sDataCursor.getVoxel(x, y, z);
        if (!voxel) continue;
        voxel.updateVoxel(2);
        checkLightUpdate(x, y, z, tasks);
        tasks.bounds.updateDisplay(x, y, z);
      }
    }
  }

  SunRemove(tasks);
  RGBRemove(tasks);
  SunUpdate(tasks);
  RGBUpdate(tasks);

  tasks.bounds.markDisplayDirty();
};
