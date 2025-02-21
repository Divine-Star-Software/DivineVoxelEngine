import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { LocationData } from "../../Math/index.js";
import { RGBRemove, RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { FlowRemove } from "../Propagation/Flow/FlowRemove.js";
import { updateLightTask } from "./Common.js";
import { PowerRemove, PowerUpdate } from "../Propagation/Power/PowerUpdate.js";

const tasks = new VoxelUpdateTask();

export async function EreaseAndUpdate(location: LocationData) {
  const [dimension, x, y, z] = location;
  tasks.setOriginAt(location);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  const substanceData = voxel.getSubstanceData();
  const foundPower = voxel.getPower();

  if (!voxel.isAir() && ES.doFlow && voxel.isRenderable()) {
    if (substanceData["dve_is_liquid"]) {
      FlowRemove(tasks);
      return tasks;
    }
  }

  tasks.bounds.updateDisplay(x - 1, y - 1, z - 1);
  tasks.bounds.updateDisplay(x + 1, y + 1, z + 1);
  if (voxel.doesVoxelAffectLogic()) {
    tasks.bounds.updateLogic(x - 1, y - 1, z - 1);
    tasks.bounds.updateLogic(x + 1, y + 1, z + 1);
  }


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


  for (let i = 0; i < CardinalNeighbors3D.length; i++) {
    const nx = CardinalNeighbors3D[i][0] + x;
    const ny = CardinalNeighbors3D[i][1] + y;
    const nz = CardinalNeighbors3D[i][2] + z;
    const voxel = tasks.sDataCursor.getVoxel(nx, ny, nz);
    if (!voxel) continue;
    voxel.updateVoxel(2);
    if (voxel.doesVoxelAffectLogic()) {
      tasks.bounds.updateLogic(nx, ny, nz);
    }
  }

  tasks.bounds.markDisplayDirty();
  tasks.bounds.markLogicDirty();
  return tasks;
}
