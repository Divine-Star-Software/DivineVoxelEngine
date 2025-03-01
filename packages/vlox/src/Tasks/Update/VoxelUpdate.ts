import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { VoxelUpdateTasks } from "../Tasks.types.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { FlowUpdate } from "../Propagation/Flow/FlowUpdate.js";
import { updateLightTask } from "./Common.js";

const tasks = new VoxelUpdateTask();

export function VoxelUpdate(data: VoxelUpdateTasks) {
  const [dimension, x, y, z] = data[0];
  tasks.setOriginAt(data[0]);
  const voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;

  tasks.bounds.updateDisplay(x, y, z);

  let doRGB = ES.doRGBPropagation;
  let doSun = ES.doSunPropagation;

  if (ES.doLight) {
    updateLightTask(tasks);
    if (doRGB) {
      tasks.rgb.update.push(x, y, z);
      RGBUpdate(tasks);
    }
    if (doSun) {
      tasks.sun.update.push(x, y, z);
      SunUpdate(tasks);
    }
  }

  tasks.bounds.markDisplayDirty();
  return tasks;
}
