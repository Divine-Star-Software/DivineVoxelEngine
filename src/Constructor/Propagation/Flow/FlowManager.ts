import { RunFlowNoChunkBuild } from "./Functions/RunFlowNoChunkBuild.js";
import {
 RunFlowReduce,
 RunFlowRemove,
 RunRemovePropagation,
} from "./Functions/RunFlowRemove.js";

import {
 RunFlow,
 RunFlowIncrease,
 RunFlowPropagation,
} from "./Functions/RunFlow.js";
import { DVEP } from "../DivineVoxelEnginePropagation.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { VoxelBrush } from "../../../Tools/Brush/Brush.js";
import { IlluminationManager } from "../Illumanation/IlluminationManager.js";

export const FlowManager = {
 //voxelByte : Util.

 lightData: LightData,
 dimension: 0,
 currentVoxel: 0,
 _visitedMap: <Record<string, boolean>>{},
 _flowQue: <number[][]>[],
 _flowRemoveQue: <number[][]>[],

 _brush: new VoxelBrush(),
 _sDataTool: new DataTool(),
 _nDataTool: new DataTool(),

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
  this.sunCheck(x, y, z);
  this._brush.setXYZ(x, y, z).paint();
  this._sDataTool.loadIn(x, y, z);
  this._sDataTool
   .setLevel(level)
   .setLevelState(levelState)
   .setLight(this.getAbsorbLight(x, y, z))
   .commit();
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
  if (!this._sDataTool.loadIn(x, y, z)) return false;
  if (!this._sDataTool.isRenderable()) {
   return false;
  }
  const substance = this._sDataTool.getSubstance();
  if (substance != "fluid" && substance != "magma") return false;
  this.currentVoxel = this._sDataTool.getId();
  this._brush.setId(this._sDataTool.getStringId());
  return true;
 },

 runRebuildQue() {
  while (this.rebuildQue.length !== 0) {
   const node = this.rebuildQue.shift();
   if (!node) break;
   const x = node[0];
   const y = node[1];
   const z = node[2];
   DVEC.DVEB.buildChunk(this.dimension, x, y, z);
  }
  DVEP.runRebuildQue();
  this.rebuildMap = {};
 },

 __addToRebuildQue(x: number, y: number, z: number) {
  const key = WorldBounds.getChunkKeyFromPosition(x, y, z);
  const chunkPOS = WorldBounds.getChunkPosition(x, y, z);
  if (
   !WorldRegister.chunk.get(this.dimension, chunkPOS.x, chunkPOS.y, chunkPOS.z)
  )
   return;
  if (!this.rebuildMap[key]) {
   this.rebuildMap[key] = true;

   this.rebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
  }
 },

 resetRebuildQue() {
  DVEP.resetRebuildQue();
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
  this._nDataTool.loadIn(x, y, z);
  this._nDataTool.setLevel(level).commit();
 },

 removeVoxel(x: number, y: number, z: number) {
  this._nDataTool.loadIn(x, y, z);
  this._nDataTool.setAir().commit();
 },

 getLevel(x: number, y: number, z: number) {
  if (!this._nDataTool.loadIn(x, y, z)) return -2;
  const voxel = this._nDataTool.data.baseId;
  if (this._nDataTool.isAir()) {
   return 0;
  }
  if (voxel == this.currentVoxel) {
   return this._nDataTool.getLevel();
  }
  return -1;
 },

 getLevelState(x: number, y: number, z: number) {
  if (!this._nDataTool.loadIn(x, y, z)) return -2;
  const voxel = this._nDataTool.data.baseId;
  if (voxel == this.currentVoxel) {
   return this._nDataTool.getLevelState();
  }
  if (this._nDataTool.isAir()) {
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

 _lightValues: <[s: number, r: number, g: number, b: number]>[0, 0, 0, 0],
 getAbsorbLight(x: number, y: number, z: number) {
  for (const n of $3dCardinalNeighbors) {
   if (!this._nDataTool.loadIn(x + n[0], y + n[1], z + n[2])) continue;
   let l = this._nDataTool.getLight();
   if (l <= 0) continue;
   const v = this.lightData.getLightValues(l);
   for (let i = 0; i < 4; i++) {
    if (this._lightValues[i] < v[i]) {
     this._lightValues[i] = v[i];
    }
   }
  }
  let brightest = this.lightData.setLightValues(this._lightValues);
  for (let i = 0; i < 4; i++) {
   this._lightValues[i] = 0;
  }
  return this.lightData.minusOneForAll(brightest);
 },

 sunCheck(x: number, y: number, z: number) {
  if (!this._nDataTool.loadIn(x, y - 1, z)) return;
  if (!this._nDataTool.isAir()) return;
  const l = this._nDataTool.getLight();
  if (this.lightData.getS(l) == 0xf) {
   IlluminationManager.runSunLightRemoveAt(x, y - 1, z);
  }
 },
};
