import { RunFlowNoChunkBuild } from "./Functions/RunFlowNoChunkBuild.js";
import {
 RunFlowReduce,
 RunFlowRemove,
 RunRemovePropagation,
} from "./Functions/RunFlowRemove.js";

import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import {
 RunFlow,
 RunFlowIncrease,
 RunFlowPropagation,
} from "./Functions/RunFlow.js";
import { DVEP } from "../DivineVoxelEnginePropagation.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
export const FlowManager = {
 //voxelByte : Util.

 currentVoxel: "",
 worldMatrx: WorldMatrix,
 _visitedMap: <Record<string, boolean>>{},
 _flowQue: <number[][]>[],
 _flowRemoveQue: <number[][]>[],

 runRemovePropagation: RunRemovePropagation,
 runFlowReduce: RunFlowReduce,
 runFlowRemove: RunFlowRemove,
 runFlow: RunFlow,
 runFlowNoChunkRebuild: RunFlowNoChunkBuild,
 runFlowIncrease: RunFlowIncrease,
 runFlowPropagation: RunFlowPropagation,

 rebuildQue: <number[][]>[],
 rebuildMap: <Record<string, boolean>>{},

 addToMap(x: number, y: number, z: number) {
  this._visitedMap[`${x}-${y}-${z}`] = true;
 },
 inMap(x: number, y: number, z: number) {
  return this._visitedMap[`${x}-${y}-${z}`] == true;
 },

 setVoxel(level: number, levelState: number, x: number, y: number, z: number) {
  WorldMatrix.setVoxel(this.currentVoxel, "default", 0, x, y, z);
  if (x == -1 && y == 40 && z == 7) {
   console.log(this.currentVoxel);
  }
  WorldMatrix.setLevel(level, x, y, z);
  if (levelState == 1) {
   WorldMatrix.setLevelState(levelState, x, y, z);
  }
 },

 runRemoveCheck(x: number, y: number, z: number) {
  const cl = this.getLevel(x, y, z);
  const n1 = this.getLevel(x + 1, y, z);
  const n1s = this.getLevelState(x + 1, y, z);
  if ((n1 > -1 && n1 < cl) || n1s == 1) {
   this._flowRemoveQue.push([x + 1, y, z]);
  }
  const n2 = this.getLevel(x - 1, y, z);
  const n2s = this.getLevelState(x - 1, y, z);
  if ((n2 > -1 && n2 < cl) || n2s == 1) {
   this._flowRemoveQue.push([x - 1, y, z]);
  }
  const n3 = this.getLevel(x, y, z + 1);
  const n3s = this.getLevelState(x, y, z + 1);
  if ((n3 > -1 && n3 < cl) || n3s == 1) {
   this._flowRemoveQue.push([x, y, z + 1]);
  }
  const n4 = this.getLevel(x, y, z - 1);
  const n4s = this.getLevelState(x, y, z - 1);
  if ((n4 > -1 && n4 < cl) || n4s == 1) {
   this._flowRemoveQue.push([x, y, z - 1]);
  }
 },

 setCurrentVoxel(x: number, y: number, z: number) {
  const voxelCheck = this.worldMatrx.getVoxelData(x, y, z);
  if (
   !voxelCheck ||
   (voxelCheck.substance != "fluid" && voxelCheck.substance != "magma")
  ) {
   return false;
  }
  this.currentVoxel = voxelCheck.id;
  return true;
 },

 runRebuildQue() {
  while (this.rebuildQue.length !== 0) {
   const node = this.rebuildQue.shift();
   if (!node) break;
   const x = node[0];
   const y = node[1];
   const z = node[2];
   DVEC.DVEB.buildChunk(x, y, z);
  }
  DVEP.runRebuildQue();
  this.rebuildMap = {};
 },

 __addToRebuildQue(x: number, y: number, z: number) {
  const key = DVEC.worldBounds.getChunkKeyFromPosition(x, y, z);
  const chunkPOS = DVEC.worldBounds.getChunkPosition(x, y, z);
  if (!this.worldMatrx.getChunk(chunkPOS.x, chunkPOS.y, chunkPOS.z)) return;
  if (!this.rebuildMap[key]) {
   this.rebuildMap[key] = true;

   this.rebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
  }
 },
 addToRebuildQue(x: number, y: number, z: number, sync = false) {
  if (sync) {
   this.__addToRebuildQue(x, y - 1, z);
   this.__addToRebuildQue(x, y + 1, z);
   this.__addToRebuildQue(x, y, z - 1);
   this.__addToRebuildQue(x - 1, y, z);
   this.__addToRebuildQue(x, y, z + 1);
   this.__addToRebuildQue(x + 1, y, z);
  } else {
   DVEP.addToRebuildQue(x, y - 1, z, "all");
   DVEP.addToRebuildQue(x, y + 1, z, "all");
   DVEP.addToRebuildQue(x, y, z - 1, "all");
   DVEP.addToRebuildQue(x - 1, y, z, "all");
   DVEP.addToRebuildQue(x, y, z + 1, "all");
   DVEP.addToRebuildQue(x + 1, y, z, "all");
  }
 },
 setLevel(level: number, x: number, y: number, z: number) {
  WorldMatrix.setLevel(level, x, y, z);
 },

 removeVoxel(x: number, y: number, z: number) {
  WorldMatrix.setAir(x, y, z, 0);
 },

 getLevel(x: number, y: number, z: number) {
  const voxel = WorldMatrix.getVoxel(x, y, z);
  if (!voxel) return -2;

  if (voxel[0] == this.currentVoxel) {
   return WorldMatrix.getLevel(x, y, z);
  }
  if (voxel[0] == "dve:air") {
   return 0;
  }

  return -1;
 },

 getLevelState(x: number, y: number, z: number) {
  const voxel = WorldMatrix.getVoxel(x, y, z);
  if (!voxel) return -2;
  if (voxel[0] == this.currentVoxel) {
   return WorldMatrix.getLevelState(x, y, z);
  }
  if (voxel[0] == "dve:air") {
   return -1;
  }

  return -1;
 },

 canFlowOutwardTest(x: number, y: number, z: number) {
  const level = this.getLevel(x, y - 1, z);
  if (level == -1) {
   return true;
  }
  return false;
 },

 canFlowDownardTest(x: number, y: number, z: number) {
  const level = this.getLevel(x, y - 1, z);
  if (level >= 0) {
   return true;
  }
  return false;
 },

 flowDownTest(x: number, y: number, z: number) {
  const level = this.getLevel(x, y - 1, z);
  if (level >= 0) {
   return true;
  }
  return false;
 },

 wait(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
 },
};
