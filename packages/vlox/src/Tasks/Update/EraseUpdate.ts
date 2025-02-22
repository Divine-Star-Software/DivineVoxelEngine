import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { LocationData } from "../../Math/index.js";
import { RGBRemove, RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { updateLightTask } from "./Common.js";
import { PowerRemove, PowerUpdate } from "../Propagation/Power/PowerUpdate.js";

const tasks = new VoxelUpdateTask();

export function EraseUpdate(location: LocationData) {
  const [dimension, x, y, z] = location;
  tasks.setOriginAt(location);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  const foundPower = voxel.getPower();

  tasks.bounds.updateDisplay(x, y, z);

  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;
  const light = voxel.getLight();
  const isLightSource = voxel.isLightSource();

  voxel.setSecondary(true).setId(0).setSecondary(false);
  voxel
    .setLight(light > 0 ? light : 0)
    .setId(0)
    .setLevel(0)
    .setLevelState(0)
    .setState(0)
    .setMod(0)
    .updateVoxel(1);
  if (ES.doLight) {
    if (ES.doRGBPropagation && isLightSource) {
      tasks.rgb.remove.push(x, y, z);
      RGBRemove(tasks);
    }
    updateLightTask(tasks);
    if (ES.doRGBPropagation) {
      RGBUpdate(tasks);
    }
    if (ES.doSunPropagation) {
      SunUpdate(tasks);
    }
  }
  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;
  if (ES.doPower) {
    if (foundPower > -1) {
      voxel.setLevel(foundPower);
      tasks.power.remove.push(x, y, z);
      PowerRemove(tasks);
      PowerUpdate(tasks);
    }
  }


  tasks.bounds.markDisplayDirty();
  return tasks;
}
