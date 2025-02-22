import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { VoxelUpdateTasks } from "../Tasks.types.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { RGBRemove, RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunRemove, SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { updateLightTask, updatePowerTask } from "./Common.js";
import { PowerUpdate } from "../../Tasks/Propagation/Power/PowerUpdate.js";

const tasks = new VoxelUpdateTask();

export function PaintAndUpdate(data: VoxelUpdateTasks) {
  const [dimension, x, y, z] = data[0];
  tasks.setOriginAt(data[0]);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  const raw = data[1];

  const isOpaque = voxel.isOpaque();
  let doRGB = ES.doRGBPropagation;
  let doSun = ES.doSunPropagation;
  const light = voxel.getLight();
  if (ES.doLight && light > 0) {
    if (doSun) {
      if (voxel.hasSunLight()) {
        tasks.sun.remove.push(x, y, z);
        SunRemove(tasks);
      }
    }
    if (doRGB) {
      if (voxel.hasRGBLight() && isOpaque) {
        tasks.rgb.remove.push(x, y, z);
        RGBRemove(tasks);
      }
    }
  }
  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;
  const id = raw[0];
  if (id < 0) return false;
  voxel.setId(id);
  voxel.setLevel(raw[2]);
  voxel.process();

  if (raw[3] > 0 && voxel.canHaveSecondaryVoxel()) {
    voxel.setSecondary(true);
    voxel.setId(raw[3]);
    voxel.setSecondary(false);
  }

  if (voxel.isLightSource() && voxel.getLightSourceValue()) {
    voxel.setLight(voxel.getLightSourceValue());
  }

  tasks.bounds.updateDisplay(x, y, z);
  voxel.updateVoxel(0);

  if (ES.doLight) {
    updateLightTask(tasks);
    if (doRGB) {
      tasks.rgb.update.push(x, y, z);
      RGBUpdate(tasks);
    }
    if (doSun) {
      SunUpdate(tasks);
    }
  }
  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;

  if (ES.doPower) {
    if (
      voxel._tags["dve_can_be_powered"] ||
      voxel._tags["dve_is_power_source"] ||
      voxel._tags["dve_can_carry_power"] ||
      voxel._tags["dve_can_hold_power"]
    ) {
      updatePowerTask(tasks);
      tasks.power.update.push(x, y, z);
      PowerUpdate(tasks);
    }
  }

  tasks.bounds.markDisplayDirty();
  return tasks;
}
