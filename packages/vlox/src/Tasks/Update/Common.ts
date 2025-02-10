import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";

export const updateLightTask = (tasks: VoxelUpdateTask) => {
  let doRGB = ES.doRGBPropagation;
  let doSun = ES.doSunPropagation;
  const [dimension, x, y, z] = tasks.origin;
  tasks.nDataCursor.setFocalPoint(dimension, x, y, z);
  for (const n of CardinalNeighbors3D) {
    const nx = n[0] + x;
    const ny = n[1] + y;
    const nz = n[2] + z;
    const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
    if (!nVoxel) continue;
    if (doRGB) {
      if (nVoxel.hasRGBLight()) {
        tasks.rgb.update.push(nx, ny, nz);
      }
    }
    if (doSun) {
      if (nVoxel.hasSunLight()) {
        tasks.sun.update.push(nx, ny, nz);
      }
    }
  }
};
export const updatePowerTask = (tasks: VoxelUpdateTask) => {

  const [dimension, x, y, z] = tasks.origin;
  tasks.nDataCursor.setFocalPoint(dimension, x, y, z);
  for (const n of CardinalNeighbors3D) {
    const nx = n[0] + x;
    const ny = n[1] + y;
    const nz = n[2] + z;
    const nVoxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
    if (!nVoxel) continue;
    if(nVoxel.getPower() > 0) {
      tasks.power.update.push(nx,ny,nz);
    }
  }
};
