import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { VoxelUpdateTasks } from "../Tasks.types.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { FlowUpdate } from "../Propagation/Flow/FlowUpdate.js";
import { updateLightTask } from "./Common.js";

const tasks = new VoxelUpdateTask();

export async function VoxelUpdate(data: VoxelUpdateTasks) {
  const [dimension, x, y, z] = data[0];
  tasks.setOriginAt(data[0]);
  const voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;

  tasks.bounds.updateDisplay(x - 1, y - 1, z - 1);
  tasks.bounds.updateDisplay(x + 1, y + 1, z + 1);
  if (voxel.doesVoxelAffectLogic()) {
    tasks.bounds.updateLogic(x - 1, y - 1, z - 1);
    tasks.bounds.updateLogic(x + 1, y + 1, z + 1);
  }

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

  if (ES.doFlow) {
    if (voxel.getSubstanceData()["dve_is_solid"]) {
      FlowUpdate(tasks);
    }
  }

  tasks.bounds.markDisplayDirty();
  tasks.bounds.markLogicDirty();
  return tasks;
}
