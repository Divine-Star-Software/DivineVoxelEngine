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

type Vertexes = 1 | 2 | 3 | 4;
const flowStates: Record<Vertexes, number> = {
 1: 0,
 2: 0,
 3: 0,
 4: 0,
};

export function CalculateFlow(
 this: typeof Processor,
 voxelData: VoxelData,
 faceFlipped: boolean,
 x: number,
 y: number,
 z: number,
 flowTemplate: number[]
) {
 currentId = voxelData.id;
 const currentLevel = getLevel(this, x, y, z);
 const state = this.worldMatrix.getLevelState(x, y, z);

 flowTemplate.push(state);
 calculateFlowV(this, state, currentLevel, 1, x, y, z);
 calculateFlowV(this, state, currentLevel, 2, x, y, z);
 calculateFlowV(this, state, currentLevel, 3, x, y, z);
 calculateFlowV(this, state, currentLevel, 4, x, y, z);
 flowTemplate.push(flowStates[1], flowStates[2], flowStates[3], flowStates[4]);
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
 //const state = process.worldMatrix.getLeveState(x, y, z);

 return level;
};

const calculateFlowV = (
 process: typeof Processor,
 state: number,
 cl: number,
 vertex: Vertexes,
 x: number,
 y: number,
 z: number
) => {
 const checkSet = checkSets[vertex];

 if (cl == 15 && state != 1) {
  flowStates[vertex] = 15;
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
   finalLevel += 2;
  }
 }
 if (finalLevel > 15) finalLevel = 15;
 if (finalLevel < 0) finalLevel = 0;
 if (totalZero && state == 1 && cl == 15) {
  finalLevel = 7;
 }

 flowStates[vertex] = finalLevel;
};
