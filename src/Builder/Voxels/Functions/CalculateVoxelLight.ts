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

const resetFlipTest = () => {
 vertexStates[1].totalZero = false;
 vertexStates[2].totalZero = false;
 vertexStates[3].totalZero = false;
 vertexStates[4].totalZero = false;
};
const flipTests = {
 top: () => {
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
  resetFlipTest();
  return t1 || t2;
 },
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
  //-x -z fix
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[1], 1);
  //-x +z
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[2], 2);
  //+x +z fix
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[3], 3);
  //+x -z
  this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[4], 4);

  if (flipTests.top()) {
   data.faceStates[0] = 1;
   data.lightTemplate.push(
    vertexStates[2].value,
    vertexStates[1].value,
    vertexStates[4].value,
    vertexStates[3].value,

   );
  } else {
   data.lightTemplate.push(
    //-x -z fix
    vertexStates[1].value,
    //-x +z
    vertexStates[2].value,
    //+x +z fix
    vertexStates[3].value,
    //+x -z
    vertexStates[4].value
   );
  }
 }

 //bottom
 if (data.exposedFaces[1]) {
  let l = this.getLight(tx, ty - 1, tz);
  data.lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[1], 1),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[2], 2),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[3], 3),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[4], 4)
  );
 }

 //east
 if (data.exposedFaces[2]) {
  let l = this.getLight(tx + 1, ty, tz);
  data.lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[1], 1),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[2], 2),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[3], 3),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[4], 4)
  );
 }

 //west
 if (data.exposedFaces[3]) {
  let l = this.getLight(tx - 1, ty, tz);
  data.lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[1], 1),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[2], 2),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[3], 3),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[4], 4)
  );
 }

 //south
 if (data.exposedFaces[4]) {
  let l = this.getLight(tx, ty, tz - 1);
  data.lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[1], 1),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[2], 2),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[3], 3),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[4], 4)
  );
 }
 //north
 if (data.exposedFaces[5]) {
  let l = this.getLight(tx, ty, tz + 1);
  data.lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[1], 1),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[2], 2),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[3], 3),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[4], 4)
  );
 }
}

const newValues: number[] = [];
const zeroCheck = { w: 0, r: 0, g: 0, b: 0 };

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
 let w = values[0];
 let r = values[1];
 let g = values[2];
 let b = values[3];

 if (w == 0) zeroCheck.w++;
 if (r == 0) zeroCheck.r++;
 if (g == 0) zeroCheck.g++;
 if (b == 0) zeroCheck.b++;

 for (let i = 6; i > 0; i -= 3) {
  const check = this.getLight(
   checkSet[i] + x,
   checkSet[i + 1] + y,
   checkSet[i + 2] + z
  );

  let neighborLightValue: number = check;
  const values = this.lightByte.getLightValues(neighborLightValue);
  let nw = values[0];
  let nr = values[1];
  let ng = values[2];
  let nb = values[3];

  if (nw == 0) zeroCheck.w++;
  if (nr == 0) zeroCheck.r++;
  if (ng == 0) zeroCheck.g++;
  if (nb == 0) zeroCheck.b++;

  if (!check) continue;

  if (nw < w && w > 0) {
   w--;
  }
  if (nw > w && w < 15) {
   w++;
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
 if (zeroCheck.w >= zeroTolerance) {
  newValues[0] = 0;
 } else {
  totalZero = false;
  newValues[0] = w;
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

 /*  
 newValues[0] = w;
 newValues[1] = r;
 newValues[2] = g;
 newValues[3] = b; */

 zeroCheck.w = 0;
 zeroCheck.r = 0;
 zeroCheck.b = 0;
 zeroCheck.g = 0;
 const returnValue = this.lightByte.setLightValues(newValues);
 vertexStates[vertex].totalZero = totalZero;
 vertexStates[vertex].value = returnValue;
 return returnValue;
}
