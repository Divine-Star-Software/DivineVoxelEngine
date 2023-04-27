import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import type { FlowTaskRequests } from "Constructor/Tasks/TasksRequest.js";
import { SunRemove, SunUpdate } from "../Illumanation/Functions/SunUpdate.js";
import { RGBUpdate } from "../Illumanation/Functions/RGBUpdate.js";
import { IlluminationManager } from "../Illumanation/IlluminationManager.js";

export const FlowManager = {
 lightData: LightData,

 _brush: new BrushTool(),
 _sDataTool: new DataTool(),
 _nDataTool: new DataTool(),

 setVoxel(
  tasks: FlowTaskRequests,
  vox: string,
  level: number,
  levelState: number,
  x: number,
  y: number,
  z: number
 ) {
  this.sunCheck(tasks, x, y, z);
  SunRemove(tasks);
  this._brush.setId(vox).setXYZ(x, y, z).paint();
  this._sDataTool.loadInAt(x, y, z);
  this._sDataTool
   .setLevel(level)
   .setLevelState(levelState)
   .setLight(this.getAbsorbLight(x, y, z))
   .commit();
  SunUpdate(tasks);
 },

 setDimension(dimension: string) {
  this._sDataTool.setDimension(dimension);
  this._nDataTool.setDimension(dimension);
  this._brush.setDimension(dimension);
  IlluminationManager.setDimension(dimension);
 },

 removeVoxel(tasks: FlowTaskRequests, x: number, y: number, z: number) {
  for (const n of $3dCardinalNeighbors) {
   const nx = x + n[0];
   const ny = y + n[1];
   const nz = z + n[2];
   if (!this._nDataTool.loadInAt(nx, ny, nz)) continue;

   const l = this._nDataTool.getLight();

   if (l <= 0) continue;

   if (this.lightData.getS(l) > 0) {
    tasks.queues.sun.update.push(nx, ny, nz);
   }

   if (this.lightData.hasRGBLight(l)) {
    tasks.queues.rgb.update.push(nx, ny, nz);
   }
  }

  this._brush.setXYZ(x, y, z).erase();

  SunUpdate(tasks);
  RGBUpdate(tasks);
 },

 getVoxel(x: number, y: number, z: number) {
  if (!this._sDataTool.loadInAt(x, y, z)) return "";
  if (!this._sDataTool.isRenderable()) return "";
  const substance = this._sDataTool.getSubstance();
  if (substance != "#dve_liquid" && substance != "#dve_magma") return "";
  return this._sDataTool.getStringId();
 },

 setLevel(level: number, x: number, y: number, z: number) {
  this._nDataTool.loadInAt(x, y, z);
  this._nDataTool.setLevel(level).commit();
 },

 getLevel(vox: string, x: number, y: number, z: number) {
  if (!this._nDataTool.loadInAt(x, y, z)) return -2;
  const voxel = this._nDataTool.getStringId();
  if (this._nDataTool.isAir()) {
   return 0;
  }
  if (voxel == vox) {
   return this._nDataTool.getLevel();
  }
  return -1;
 },

 getLevelState(vox: string, x: number, y: number, z: number) {
  if (!this._nDataTool.loadInAt(x, y, z)) return -2;
  const voxel = this._nDataTool.getStringId();
  if (voxel == vox) {
   return this._nDataTool.getLevelState();
  }
  if (this._nDataTool.isAir()) {
   return -1;
  }
  return -3;
 },

 canFlowOutwardTest(vox: string, x: number, y: number, z: number) {
  const level = this.getLevel(vox, x, y - 1, z);
  if (level == -1) {
   return true;
  }
  return false;
 },

 flowDownTest(vox: string, x: number, y: number, z: number) {
  const level = this.getLevel(vox, x, y - 1, z);
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
   if (!this._nDataTool.loadInAt(x + n[0], y + n[1], z + n[2])) continue;
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

 sunCheck(tasks: FlowTaskRequests, x: number, y: number, z: number) {
  if (!this._nDataTool.loadInAt(x, y - 1, z)) return;
  if (!this._nDataTool.isAir()) return;
  const l = this._nDataTool.getLight();
  if (this.lightData.getS(l) == 0xf) {
   tasks.queues.sun.remove.push(x, y - 1, z);
  }
 },
};
