import { DVEP } from "../../DivineVoxelEnginePropagation.js";
import { WorldMatrix } from "../../../../Matrix/WorldMatrix.js";
import type { FlowManager } from "../FlowManager";

let currentVoxel = "";

const setVoxel = (
 level: number,
 levelState: number,
 x: number,
 y: number,
 z: number
) => {
 WorldMatrix.setVoxel(currentVoxel, "default", 0, x, y, z);
 WorldMatrix.setLevel(level, x, y, z);
 if (levelState == 1) {
  WorldMatrix.setLevelState(levelState, x, y, z);
 }
};

const getLevel = (x: number, y: number, z: number) => {
 const voxel = WorldMatrix.getVoxel(x, y, z);
 if (!voxel) return -2;

 if (voxel[0] == currentVoxel) {
  return WorldMatrix.getLevel(x, y, z);
 }
 if (voxel[0] == "dve:air") {
  return 0;
 }

 return -1;
};

const canFlowOutwardTest = (x: number, y: number, z: number) => {
 const level = getLevel(x, y - 1, z);
 if (level == -1) {
  return true;
 }
 return false;
};

const canFlowDownardTest = (x: number, y: number, z: number) => {
 const level = getLevel(x, y - 1, z);
 if (level >= 0) {
  return true;
 }
 return false;
};

const flowDownTest = (x: number, y: number, z: number) => {
 const level = getLevel(x, y - 1, z);
 if (level >= 0) {
  return true;
 }
 return false;
};

const addToMap = (
 flow: typeof FlowManager,
 x: number,
 y: number,
 z: number
) => {
 flow._visitedMap[`${x}-${y}-${z}`];
};

const inMap = (flow: typeof FlowManager, x: number, y: number, z: number) => {
 if (flow._visitedMap[`${x}-${y}-${z}`]) {
  return true;
 }
 return false;
};

const run = async (flow: typeof FlowManager, que: number[][]) => {
 let maxRuns = 30;
 let currentCount = 0;

 while (que.length != 0) {
  const node = que.shift();
  if (!node) {
   return;
  }
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const l = getLevel(x, y, z);

  if (inMap(flow, x, y, z)) continue;
  addToMap(flow, x, y, z);

  if (l == 1) {
   continue;
  }
  if (canFlowOutwardTest(x, y, z)) {
   const n1 = getLevel(x + 1, y, z);
   if (n1 + 2 < l && n1 > -1) {
    let state = 0;
    if (flowDownTest(x + 1, y, z)) {
     state = 1;
    }
    setVoxel(l - 1, state, x + 1, y, z);
    DVEP.addToRebuildQue(x + 1, y, z, "all");
    que.push([x + 1, y, z]);
   }
   const n2 = getLevel(x - 1, y, z);
   if (n2 + 2 < l && n2 > -1) {
    let state = 0;
    if (flowDownTest(x - 1, y, z)) {
     state = 1;
    }
    setVoxel(l - 1, state, x - 1, y, z);
    DVEP.addToRebuildQue(x - 1, y, z, "all");
    que.push([x - 1, y, z]);
   }
   const n3 = getLevel(x, y, z + 1);
   if (n3 + 2 < l && n3 > -1) {
    let state = 0;
    if (flowDownTest(x, y, z + 1)) {
     state = 1;
    }
    setVoxel(l - 1, state, x, y, z + 1);
    DVEP.addToRebuildQue(x, y, z + 1, "all");
    que.push([x, y, z + 1]);
   }
   const n4 = getLevel(x, y, z - 1);
   if (n4 + 2 < l && n4 > -1) {
    let state = 0;
    if (flowDownTest(x, y, z - 1)) {
     state = 1;
    }
    setVoxel(l - 1, state, x, y, z - 1);
    DVEP.addToRebuildQue(x, y, z - 1, "all");
    que.push([x, y, z - 1]);
   }
  }

  if (canFlowDownardTest(x, y, z)) {
   const n5 = getLevel(x, y - 1, z);
   if (n5 <= l && n5 > -1) {
    setVoxel(l, 1, x, y - 1, z);
    DVEP.addToRebuildQue(x, y - 1, z, "all");
    que.push([x, y - 1, z]);
   }
  }
  DVEP.runRebuildQue();
  await wait(50);
 }
 DVEP.runRebuildQue();
 //run(que);
};

const wait = (ms: number) => {
 return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

export async function RunFlow(
 this: typeof FlowManager,
 x: number,
 y: number,
 z: number
) {
 const voxelCheck = WorldMatrix.getVoxelData(x, y, z);
 if (
  !voxelCheck ||
  (voxelCheck.substance != "fluid" && voxelCheck.substance != "magma")
 ) {
  return;
 }
 currentVoxel = voxelCheck.id;

 this._flowQue.push([x, y, z]);

 await run(this, this._flowQue);
 this._visitedMap = {};
}
