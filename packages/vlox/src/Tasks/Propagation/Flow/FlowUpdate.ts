import { FlowManager as FM } from "./FlowManager.js";
import { EngineSettings } from "../../../Settings/EngineSettings.js";
import { VoxelUpdateTask } from "../../VoxelUpdateTask.js"

export async function FlowUpdate(tasks: VoxelUpdateTask, rebuild = true) {
/*   const [dimension, x, y, z] = tasks.origin;
  FM.setDimension(dimension);
  const vox = FM.getVoxel(x, y, z);
  if (!vox) return;
  const flowRate = vox.getSubstnaceData().getFlowRate();
  const level = FM.getLevel(vox.getStringId(), x, y, z);
  if (level < 0) return;
  const levelState = FM.getLevelState(vox.getStringId(), x, y, z);
  tasks.flow.update.queue.push([x, y, z, level, levelState]);
  while (tasks.flow.update.queue.length != 0) {
    FM.setDimension(dimension);
    RunFlowPropagation(tasks, vox.getStringId());
    RunFlowIncrease(tasks, vox.getStringId());
    if (rebuild) {
    //  tasks.runRebuildQueue();
      await FM.wait(EngineSettings.settings.flow.baseFlowLimit * flowRate);
    }
  } */
}
function RunFlowPropagation(tasks: VoxelUpdateTask, vox: string) {
/*   const que = tasks.flow.update.queue;
  const noRemoveMap = tasks.flow.remove.noRemoveMap;
  for (let i = 0; i < que.length; i++) {
    const node = que[i];
    const x = node[0];
    const y = node[1];
    const z = node[2];
    const l = FM.getLevel(vox, x, y, z);
    const s = FM.getLevelState(vox, x, y, z);
    noRemoveMap.add(x, y, z);
    if (FM.canFlowOutwardTest(vox, x, y, z)) {
      const n1 = FM.getLevel(vox, x + 1, y, z);
      if (n1 + 1 < l && n1 >= 0) {
        let n1l = l - 1;
        que.push([x + 1, y, z, n1l, 0]);
      }

      const n2 = FM.getLevel(vox, x - 1, y, z);

      if (n2 + 1 < l && n2 >= 0) {
        let n2l = l - 1;
        que.push([x - 1, y, z, n2l, 0]);
      }

      const n3 = FM.getLevel(vox, x, y, z + 1);
      if (n3 + 1 < l && n3 >= 0) {
        let n3l = l - 1;
        que.push([x, y, z + 1, n3l, 0]);
      }

      const n4 = FM.getLevel(vox, x, y, z - 1);
      if (n4 + 1 < l && n4 >= 0) {
        let n4l = l - 1;
        que.push([x, y, z - 1, n4l, 0]);
      }
    }

    const n5 = FM.getLevel(vox, x, y - 1, z);
    if (n5 <= l && n5 >= 0) {
      let state = 1;
      let level = 7;
      if (l <= 0 && s != 1) {
        state = 0;
        level = l - 2;
      }
      que.push([x, y - 1, z, level, state]);
    }
  } */
}

function RunFlowIncrease(tasks: VoxelUpdateTask, vox: string) {
  const que = tasks.flow.update.queue;
  const map = tasks.flow.update.map;
  const reque: number[][] = [];
  while (que.length != 0) {
    const node = que.shift();
    if (!node) {
      break;
    }
    const x = node[0];
    const y = node[1];
    const z = node[2];
    const level = node[3];
    const levelState = node[4];
    if (map.has(x, y, z)) continue;
    map.add(x, y, z);
    if (level > -1) {
      FM.setVoxel(tasks, vox, level, levelState, x, y, z);

      reque.push([x, y, z, -1]);
    }
    tasks.bounds.updateDisplay(x,y,z);
  }

  //@ts-ignore
  tasks.queues.flow.update.queue = reque;
  map.clear();
}
