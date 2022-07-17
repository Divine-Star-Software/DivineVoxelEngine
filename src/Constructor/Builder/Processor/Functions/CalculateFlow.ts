import type { VoxelData } from "Meta/index";
import type { Processor } from "../Processor";

const checkSets = {
 1: [
  -1, 0, 0, -1,
  //corner
  -1, -1,
 ],

 2: [
  -1, 0, 0, 1,
  //corner
  -1, 1,
 ],

 3: [
  1, 0, 0, 1,
  //corner
  1, 1,
 ],

 4: [
  1, 0, 0, -1,
  //corner
  1, -1,
 ],
};

let currentId = "";

export function CalculateFlow(
 this: typeof Processor,
 voxelData: VoxelData,
 x: number,
 y: number,
 z: number,
 flowTemplate: number[]
) {
 currentId = voxelData.id;
 const currentLevel = getLevel(this, x, y, z);
 const state = this.worldMatrix.getLeveState(x, y, z);

 flowTemplate.push(state);
 calculateFlowV(this, state, currentLevel, 1, x, y, z, flowTemplate);
 calculateFlowV(this, state, currentLevel, 2, x, y, z, flowTemplate);
 calculateFlowV(this, state, currentLevel, 3, x, y, z, flowTemplate);
 calculateFlowV(this, state, currentLevel, 4, x, y, z, flowTemplate);
}

const getLevel = (
 process: typeof Processor,
 x: number,
 y: number,
 z: number
) => {
 const voxel = process.worldMatrix.getVoxel(x, y, z);
 if (!voxel) return -1;
 if (voxel[0] != currentId) return -1;
 const level = process.worldMatrix.getLevel(x, y, z);
 const state = process.worldMatrix.getLeveState(x,y,z);
 if(state == 1) {
    return 15;
 }
 return level;
};

const calculateFlowV = (
 process: typeof Processor,
 state: number,
 cl: number,
 vertex: 1 | 2 | 3 | 4,
 x: number,
 y: number,
 z: number,
 flowTemplate: number[]
) => {
 const checkSet = checkSets[vertex];

 if (cl == 15 && state != 1) {
  flowTemplate.push(cl);
  return;
 }
 let finalLevel = cl;
 let totalZero = true;
 for (let i = 0; i < 6; i += 2) {
  const cx = checkSet[i] + x;
  const cz = checkSet[i + 1] + z;

  const level = getLevel(process, cx, y, cz);

  if (level == 15) {
   finalLevel = 15;
   totalZero = false;
   break;
  }

  if (level > 0) {
   totalZero = false;
  }
  if (finalLevel < level) {
   finalLevel++;
  }
 }
 if (finalLevel > 15) finalLevel = 15;
 if (finalLevel < 0) finalLevel = 0;
 if (totalZero && state == 1) {
  finalLevel = 7;
 }

 flowTemplate.push(finalLevel);
};
