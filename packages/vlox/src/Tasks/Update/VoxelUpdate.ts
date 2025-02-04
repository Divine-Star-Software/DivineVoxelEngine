import { EngineSettings as ES } from "../../Settings/EngineSettings.js";
import { $3dCardinalNeighbors } from "../../Math/CardinalNeighbors.js";

import { VoxelUpdateTasks } from "../Tasks.types.js";
import { UpdateTask } from "./UpdateTask.js";

import { LocationData } from "../../Math/index.js";
import { RGBRemove, RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunRemove, SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { FlowUpdate } from "../Propagation/Flow/FlowUpdate.js";
import { FlowRemove } from "../Propagation/Flow/FlowRemove.js";

const tasks = new UpdateTask();

const updateLightTask = (tasks: UpdateTask) => {
  let doRGB = ES.doRGBPropagation;
  let doSun = ES.doSunPropagation;
  const [dimension, x, y, z] = tasks.origin;
  tasks.nDataCursor.setFocalPoint(dimension, x, y, z);
  for (const n of $3dCardinalNeighbors) {
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

export async function EreaseAndUpdate(location: LocationData) {
  const [dimension, x, y, z] = location;
  tasks.setOrigin(location);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  const substanceData = voxel.getSubstanceData();

  if (!voxel.isAir() && ES.doFlow && voxel.isRenderable()) {
    if (substanceData["dve_is_liquid"]) {
      FlowRemove(tasks);
      return tasks;
    }
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

  tasks.bounds.update(x, y, z);
  tasks.bounds.update(x + 1, y + 1, z + 1);

  for (let i = 0; i < $3dCardinalNeighbors.length; i++) {
    tasks.sDataCursor
      .getVoxel(
        $3dCardinalNeighbors[i][0] + x,
        $3dCardinalNeighbors[i][1] + y,
        $3dCardinalNeighbors[i][2] + z
      )
      ?.updateVoxel(2);
  }
  return tasks;
}

export async function PaintAndUpdate(data: VoxelUpdateTasks) {
  const [dimension, x, y, z] = data[0];
  tasks.setOrigin(data[0]);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  const raw = data[1];

  const isOpaque = voxel.isOpaque();
  let doRGB = ES.doRGBPropagation;
  let doSun = ES.doSunPropagation;

  lighttest: if (ES.doLight) {
    const light = voxel.getLight();
    if (light <= 0) break lighttest;
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
  voxel.setState(raw[3]);
  voxel.setMod(raw[4]);
  voxel.process();

  if (raw[3] > 0 && voxel.canHaveSecondaryVoxel()) {
    voxel.setSecondary(true);
    voxel.setId(raw[5]);
    voxel.setSecondary(false);
  }

  if (voxel.isLightSource() && voxel.getLightSourceValue()) {
    voxel.setLight(voxel.getLightSourceValue());
  }

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
  if (ES.doFlow) {
    if (!voxel.isAir() && voxel.getSubstanceData()["dve_is_liquid"]) {
      FlowUpdate(tasks);
    }
  }
  tasks.bounds.update(x, y, z);
  tasks.bounds.update(x + 1, y + 1, z + 1);

  for (let i = 0; i < $3dCardinalNeighbors.length; i++) {
    tasks.sDataCursor
      .getVoxel(
        $3dCardinalNeighbors[i][0] + x,
        $3dCardinalNeighbors[i][1] + y,
        $3dCardinalNeighbors[i][2] + z
      )
      ?.updateVoxel(2);
  }

  return tasks;
}

export async function VoxelUpdate(data: VoxelUpdateTasks) {
  const [dimension, x, y, z] = data[0];
  tasks.setOrigin(data[0]);
  const voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return false;

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
  tasks.bounds.update(x, y, z);
  tasks.bounds.update(x + 1, y + 1, z + 1);

  return tasks;
}
