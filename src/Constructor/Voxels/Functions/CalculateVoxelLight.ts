import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper.js";
const vertexStates = {
 1: {
  totalZero: false,
  value: 0,
 },
 2: {
  totalZero: false,
  value: 0,
 },
 3: {
  totalZero: false,
  value: 0,
 },
 4: {
  totalZero: false,
  value: 0,
 },
};

const flipCheck = () => {
 let t1 =
  !vertexStates[1].totalZero &&
  vertexStates[2].totalZero &&
  vertexStates[3].totalZero &&
  vertexStates[4].totalZero;
 let t2 =
  vertexStates[1].totalZero &&
  vertexStates[2].totalZero &&
  !vertexStates[3].totalZero &&
  vertexStates[4].totalZero;
 return t1 || t2;
};

const handleAdd = (data: VoxelProcessData, face: number) => {
 if (flipCheck()) {
  data.faceStates[face] = 1;
  data.lightTemplate.push(
   vertexStates[2].value,
   vertexStates[1].value,
   vertexStates[4].value,
   vertexStates[3].value
  );
 } else {
  data.lightTemplate.push(
   vertexStates[1].value,
   vertexStates[2].value,
   vertexStates[3].value,
   vertexStates[4].value
  );
 }
};

const voxelLightChecks = {
 top: {
  1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
  2: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
  3: [1, 1, 0, 0, 1, 1, 1, 1, 1],
  4: [1, 1, 0, 0, 1, -1, 1, 1, -1],
 },
 top0: {
  1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
  2: [-1, 1, 1, -1, 1, 0, 0, 1, 1],
  3: [1, 1, 0, 0, 1, 1, 1, 1, 1],
  4: [1, 1, 0, 0, 1, -1, 1, 1, -1],
 },

 bottom: {
  1: [0, -1, -1, -1, -1, 0, -1, -1, -1],
  2: [0, -1, -1, 1, -1, 0, 1, -1, -1],
  3: [0, -1, 1, 1, -1, 0, 1, -1, 1],
  4: [0, -1, 1, -1, -1, 0, -1, -1, 1],
 },
 east: {
  1: [1, 0, -1, 1, 1, 0, 1, 1, -1],
  2: [1, 0, 1, 1, 1, 0, 1, 1, 1],
  3: [1, 0, 1, 1, -1, 0, 1, -1, 1],
  4: [1, 0, -1, 1, -1, 0, 1, -1, -1],
 },
 west: {
  1: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
  2: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
  3: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
  4: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
 },
 south: {
  1: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
  2: [1, 0, -1, 0, 1, -1, 1, 1, -1],
  3: [1, 0, -1, 0, -1, -1, 1, -1, -1],
  4: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
 },
 north: {
  1: [1, 0, 1, 0, 1, 1, 1, 1, 1],
  2: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
  3: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
  4: [1, 0, 1, 0, -1, 1, 1, -1, 1],
 },
};

export function CalculateVoxelLight(
 this: typeof VoxelHelper,
 data: VoxelProcessData,
 tx: number,
 ty: number,
 tz: number
) {
 //top
 if (data.exposedFaces[0]) {
  let l = this.getLight(tx, ty + 1, tz);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[4], 4);
  handleAdd(data, 0);
 }

 //bottom
 if (data.exposedFaces[1]) {
  let l = this.getLight(tx, ty - 1, tz);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[4], 4);
  handleAdd(data, 1);
 }

 //east
 if (data.exposedFaces[2]) {
  let l = this.getLight(tx + 1, ty, tz);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[4], 4);
  handleAdd(data, 2);
 }

 //west
 if (data.exposedFaces[3]) {
  let l = this.getLight(tx - 1, ty, tz);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[4], 4);
  handleAdd(data, 3);
 }

 //south
 if (data.exposedFaces[4]) {
  let l = this.getLight(tx, ty, tz - 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[4], 4);
  handleAdd(data, 4);
 }
 //north
 if (data.exposedFaces[5]) {
  let l = this.getLight(tx, ty, tz + 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[1], 1);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[2], 2);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[3], 3);
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[4], 4);
  handleAdd(data, 5);
 }
}

const newValues: number[] = [];
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };

export function VoxelLightMixCalc(
 this: typeof VoxelHelper,
 voxelLigtValue: number,
 x: number,
 y: number,
 z: number,
 checkSet: number[],
 vertex: 1 | 2 | 3 | 4
) {
 const values = this.lightByte.getLightValues(voxelLigtValue);
 let s = values[0];
 let r = values[1];
 let g = values[2];
 let b = values[3];

 if (s == 0) zeroCheck.s++;
 if (r == 0) zeroCheck.r++;
 if (g == 0) zeroCheck.g++;
 if (b == 0) zeroCheck.b++;

 for (let i = 6; i > 0; i -= 3) {
  const neighborLightValue = this.getLight(
   checkSet[i] + x,
   checkSet[i + 1] + y,
   checkSet[i + 2] + z
  );
  if (neighborLightValue == -1) continue;

  const values = this.lightByte.getLightValues(neighborLightValue);
  let ns = values[0];
  let nr = values[1];
  let ng = values[2];
  let nb = values[3];

  if (ns == 0) zeroCheck.s++;
  if (nr == 0) zeroCheck.r++;
  if (ng == 0) zeroCheck.g++;
  if (nb == 0) zeroCheck.b++;

  if (!neighborLightValue) continue;
  if(ns == 15) continue; 

  if (ns < s && s > 0) {
   s--;
  }
  if (ns > s && s < 15) {
   s++;
  }

  if (nr < r && r > 0) {
   r--;
  }
  if (nr > r && r < 15) {
   r++;
  }

  if (ng < g && g > 0) {
   g--;
  }
  if (ng > g && g < 15) {
   g++;
  }

  if (nb < b && b > 0) {
   b--;
  }
  if (nb > b && b < 15) {
   b++;
  }
 }

 let zeroTolerance = 2;
 let totalZero = true;
 if (zeroCheck.s >= zeroTolerance) {
  newValues[0] = 0;
 } else {
  totalZero = false;
  newValues[0] = s;
 }
 if (zeroCheck.r >= zeroTolerance) {
  newValues[1] = 0;
 } else {
  totalZero = false;
  newValues[1] = r;
 }
 if (zeroCheck.g >= zeroTolerance) {
  newValues[2] = 0;
 } else {
  totalZero = false;
  newValues[2] = g;
 }
 if (zeroCheck.b >= zeroTolerance) {
  newValues[3] = 0;
 } else {
  totalZero = false;
  newValues[3] = b;
 }


 const returnValue = this.lightByte.setLightValues(newValues);
 vertexStates[vertex].totalZero = totalZero;
 vertexStates[vertex].value = returnValue;

 zeroCheck.s = 0;
 zeroCheck.r = 0;
 zeroCheck.b = 0;
 zeroCheck.g = 0;
 return returnValue;
}
