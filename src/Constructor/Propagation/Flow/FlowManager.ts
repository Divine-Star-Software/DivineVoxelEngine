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
import { Propagation } from "../Propagation.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { IlluminationManager } from "../Illumanation/IlluminationManager.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

export const FlowManager = {
 //voxelByte : Util.

 lightData: LightData,
 dimension: "main",
 currentVoxel: 0,
 _visitedMap: <Map<string, boolean>>new Map(),
 _removeMap: <Map<string, boolean>>new Map(),
 _flowQue: <number[][]>[],
 _flowRemoveQue: <number[][]>[],

 _brush: new BrushTool(),
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
  this._visitedMap.set(`${x}-${y}-${z}`, true);
 },
 inMap(x: number, y: number, z: number) {
  return this._visitedMap.has(`${x}-${y}-${z}`);
 },
 addToRemoveMap(x: number, y: number, z: number) {
  this._removeMap.set(`${x}-${y}-${z}`, true);
 },
 inRemoveMap(x: number, y: number, z: number) {
  return this._removeMap.has(`${x}-${y}-${z}`);
 },
 removeFromRemoveMap(x: number, y: number, z: number) {
  return this._removeMap.delete(`${x}-${y}-${z}`);
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

 removeVoxel(x: number, y: number, z: number) {
  for (const n of $3dCardinalNeighbors) {
   const nx = x + n[0];
   const ny = y + n[1];
   const nz = z + n[2];
   if (!this._nDataTool.loadIn(nx, ny, nz)) continue;

   const l = this._nDataTool.getLight();

   if (l <= 0) continue;

   if (this.lightData.getS(l) > 0) {
    IlluminationManager._sunLightUpdate.enqueue([nx, ny, nz]);
   }

   if (this.lightData.hasRGBLight(l)) {
    IlluminationManager._RGBlightUpdateQ.push([nx, ny, nz]);
   }
  }

  this._brush.setXYZ(x, y, z).erase();

  IlluminationManager.runSunLightUpdate();
  IlluminationManager.runRGBUpdate();
 },

 flowOutCheck(
  l: number,
  nl: number,
  ns: number,
  x: number,
  y: number,
  z: number
 ) {
  if (nl >= l || ns == 1) {
   this._flowQue.push([x, y, z]);
  }

  /*   if (ns == 1) {
   const cl = this.getLevel(x, y - 1, z);
   if (cl == -1 || cl == 0) {
    this._flowQue.push([x, y, z]);
   }
  } */
 },

 runRemoveCheck(x: number, y: number, z: number) {
  const cl = this.getLevel(x, y, z);

  this._flowRemoveQue.push([x, y, z]);

  const n1 = this.getLevel(x + 1, y, z);
  const n1s = this.getLevelState(x + 1, y, z);

  if ((n1 > -1 && n1 < cl) || n1s == 1) {
   this._flowRemoveQue.push([x + 1, y, z]);
  }
  const n2 = this.getLevel(x - 1, y, z);
  const n2s = this.getLevelState(x - 1, y, z);
  if ((n2 > 0 && n2 < cl) || n2s == 1) {
   this._flowRemoveQue.push([x - 1, y, z]);
  }
  const n3 = this.getLevel(x, y, z + 1);
  const n3s = this.getLevelState(x, y, z + 1);
  if ((n3 > 0 && n3 < cl) || n3s == 1) {
   this._flowRemoveQue.push([x, y, z + 1]);
  }
  const n4 = this.getLevel(x, y, z - 1);
  const n4s = this.getLevelState(x, y, z - 1);
  if ((n4 > 0 && n4 < cl) || n4s == 1) {
   this._flowRemoveQue.push([x, y, z - 1]);
  }
 },

 setCurrentVoxel(x: number, y: number, z: number) {
  if (!this._sDataTool.loadIn(x, y, z)) return false;
  if (!this._sDataTool.isRenderable()) {
   return false;
  }
  const substance = this._sDataTool.getSubstance();
  if (substance != "liquid" && substance != "magma") return false;
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
   DVEC.builder.buildChunk(this.dimension, x, y, z);
  }
  Propagation.runRebuildQue();
  this.rebuildMap = {};
 },

 __addToRebuildQue(x: number, y: number, z: number) {
  const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
  const key = WorldSpaces.chunk.getKey();
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
  Propagation.resetRebuildQue();
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
   Propagation.addToRebuildQue(x, y - 1, z, "all");
   Propagation.addToRebuildQue(x, y + 1, z, "all");
   Propagation.addToRebuildQue(x, y, z - 1, "all");
   Propagation.addToRebuildQue(x - 1, y, z, "all");
   Propagation.addToRebuildQue(x, y, z + 1, "all");
   Propagation.addToRebuildQue(x + 1, y, z, "all");
  }
 },
 setLevel(level: number, x: number, y: number, z: number) {
  this._nDataTool.loadIn(x, y, z);
  this._nDataTool.setLevel(level).commit();
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
  return -3;
 },

 canFlowOutwardTest(x: number, y: number, z: number) {
  const level = this.getLevel(x, y - 1, z);
  if (level == -1) {
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
