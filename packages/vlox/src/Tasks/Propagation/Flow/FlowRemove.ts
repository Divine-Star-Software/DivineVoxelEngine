import { FlowUpdate } from "./FlowUpdate.js";

import { FlowManager as FM } from "./FlowManager.js";
import { EngineSettings } from "../../../Settings/EngineSettings.js";

import { VoxelUpdateTask } from "../../VoxelUpdateTask.js"

function RunRemoveCheck(tasks: VoxelUpdateTask, vox: string) {
/*   const [dimension, x, y, z] = tasks.origin;
  const queue = tasks.flow.remove.queue;
  const cl = FM.getLevel(vox, x, y, z);
  queue.push([x, y, z]);
  const n1 = FM.getLevel(vox, x + 1, y, z);
  const n1s = FM.getLevelState(vox, x + 1, y, z);
  if ((n1 > -1 && n1 < cl) || n1s == 1) {
    queue.push([x + 1, y, z]);
  }
  const n2 = FM.getLevel(vox, x - 1, y, z);
  const n2s = FM.getLevelState(vox, x - 1, y, z);
  if ((n2 > -1 && n2 < cl) || n2s == 1) {
    queue.push([x - 1, y, z]);
  }
  const n3 = FM.getLevel(vox, x, y, z + 1);
  const n3s = FM.getLevelState(vox, x, y, z + 1);
  if ((n3 > -1 && n3 < cl) || n3s == 1) {
    queue.push([x, y, z + 1]);
  }
  const n4 = FM.getLevel(vox, x, y, z - 1);
  const n4s = FM.getLevelState(vox, x, y, z - 1);
  if ((n4 > -1 && n4 < cl) || n4s == 1) {
    queue.push([x, y, z - 1]);
  } */
}

export async function FlowRemove(tasks: VoxelUpdateTask) {
/*   const [dimension, x, y, z] = tasks.origin;
  FM.setDimension(dimension);
  const vox = FM.getVoxel(x, y, z);
  if (!vox) return;
  const voxId = vox.getStringId();
  const flowRate = vox.getSubstnaceData().getFlowRate();
  RunRemoveCheck(tasks, voxId);
  const noRemoveMap = tasks.flow.remove.noRemoveMap;
  while (tasks.flow.remove.queue.length != 0) {
    FM.setDimension(dimension);
    RunRemovePropagation(tasks, voxId);
    RunFlowReduce(tasks, voxId);
    await FlowUpdate(tasks, false);
    noRemoveMap.clear();
  //  tasks.runRebuildQueue();
    await FM.wait(EngineSettings.settings.flow.baseFlowLimit * flowRate);
  } */
}

function RunRemovePropagation(tasks: VoxelUpdateTask, vox: string) {
/*   const removeQ = tasks.flow.remove.queue;
  const updateQ = tasks.flow.update.queue;
  const map = tasks.flow.update.map;
  const noRemoveMap = tasks.flow.remove.noRemoveMap;
  for (let i = 0; i < removeQ.length; i++) {
   const node = removeQ[i];
   const x = node[0];
   const y = node[1];
   const z = node[2];
   const l = FM.getLevel(vox, x, y, z);
   const s = FM.getLevelState(vox, x, y, z);
   map.add(x, y, z);
   if (noRemoveMap.has(x, y, z)) continue;
 
   n1t: if (!map.has(x + 1, y, z)) {
    const n1 = FM.getLevel(vox, x + 1, y, z);
    const n1s = FM.getLevelState(vox, x + 1, y, z);
    if (n1 <= 0 || n1s == 1) break n1t;
    if (n1 < l && l > 0 && n1 > 0) {
     removeQ.push([x + 1, y, z]);
    }
    if (n1 > l) {
     updateQ.push([x + 1, y, z]);
    }
   }
   n2t: if (!map.has(x - 1, y, z)) {
    const n2 = FM.getLevel(vox, x - 1, y, z);
    const n2s = FM.getLevelState(vox, x - 1, y, z);
    if (n2 <= 0 || n2s == 1) break n2t;
    if (n2 < l && l > 0 && n2 > 0) {
     removeQ.push([x - 1, y, z]);
    }
    if (n2 > l) {
     updateQ.push([x - 1, y, z]);
    }
   }
   n3t: if (!map.has(x, y, z + 1)) {
    const n3 = FM.getLevel(vox, x, y, z + 1);
    const n3s = FM.getLevelState(vox, x, y, z + 1);
    if (n3 <= 0 || n3s == 1) break n3t;
    if (n3 < l && l > 0 && n3 > 0) {
     removeQ.push([x, y, z + 1]);
    }
    if (n3 > l) {
     updateQ.push([x, y, z + 1]);
    }
   }
 
   n4t: if (!map.has(x, y, z - 1)) {
    const n4 = FM.getLevel(vox, x, y, z - 1);
    const n4s = FM.getLevelState(vox, x, y, z - 1);
    if (n4 <= 0 || n4s == 1) break n4t;
    if (n4 < l && l > 0 && n4 > 0) {
     removeQ.push([x, y, z - 1]);
    }
    if (n4 > l) {
     updateQ.push([x, y, z - 1]);
    }
   }
 
   
   if (!map.has(x, y - 1, z)) {
    const n5 = FM.getLevel(vox, x, y - 1, z);
    if (n5 < 0) continue;
    const n5s = FM.getLevelState(vox, x, y - 1, z);
    let add = false;
    if (s == 1 && n5s == 1) {
     if (l <= 1) {
      add = true;
     }
    }
    if (s == 0 && l <= 1) {
     add = true;
    }
    if (add) {
     removeQ.push([x, y - 1, z]);
    }
   }
  }
  map.clear(); */
 }
function RunFlowReduce(tasks: VoxelUpdateTask, vox: string) {
/*   const queue = tasks.flow.remove.queue;
  const map = tasks.flow.remove.map;
  const reque: number[][] = [];
  while (queue.length != 0) {
    const node = queue.shift();
    if (!node) {
      break;
    }
    const x = node[0];
    const y = node[1];
    const z = node[2];
    if (map.has(x, y, z)) continue;
    map.add(x, y, z);

    const l = FM.getLevel(vox, x, y, z);

    if (l <= 1) {
      FM.removeVoxel(tasks, x, y, z);
      reque.push([x, y, z]);
    } else {
      FM.setLevel(l - 1, x, y, z);
      reque.push([x, y, z]);
    }
    tasks.bounds.update(x, y, z);
  }

  tasks.flow.remove.queue = reque;
  map.clear(); */
}
