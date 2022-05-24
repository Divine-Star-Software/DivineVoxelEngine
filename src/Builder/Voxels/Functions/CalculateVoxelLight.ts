import type { VoxelData } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper.js";
//
const voxelLightChecks = {
 top: {
  1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
  2: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
  3: [1, 1, 0,  0, 1, 1,   1, 1, 1],
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
 voxel: VoxelData,
 voxelData: number,
 lightTemplate: number[],
 exposedFaces: number[],
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 x: number,
 y: number,
 z: number
) {
 const tx = chunkX + x;
 const ty = chunkY + y;
 const tz = chunkZ + z;
 //top
 if (exposedFaces[0]) {
  let l = this.getLight(tx, ty + 1, tz);
  lightTemplate.push(
   //-x -z
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[1]),
   //-x +z
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[2]),
   //+x +z
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[3]),
   //+x -z
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.top[4])
  );
 }

 //bottom
 if (exposedFaces[1]) {
  let l = this.getLight(tx, ty - 1, tz);
  lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[1]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[2]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[3]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.bottom[4])
  );
 }

 //east
 if (exposedFaces[2]) {
  let l = this.getLight(tx + 1, ty, tz);
  lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[1]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[2]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[3]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.east[4])
  );
 }

 //west
 if (exposedFaces[3]) {
  let l = this.getLight(tx - 1, ty, tz);
  lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[1]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[2]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[3]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.west[4])
  );
 }

 //south
 if (exposedFaces[4]) {
  let l = this.getLight(tx, ty, tz - 1);
  lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[1]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[2]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[3]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.south[4])
  );
 }
 //north
 if (exposedFaces[5]) {
  let l = this.getLight(tx, ty, tz + 1);
  lightTemplate.push(
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[1]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[2]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[3]),
   this.voxellightMixCalc(l, tx, ty, tz, voxelLightChecks.north[4])
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
 checkSet: number[]
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

  if(!check)continue;
  

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
 if (zeroCheck.w >= 2) {
  newValues[0] = 0;
 } else {
  newValues[0] = w;
 }
 if (zeroCheck.r >= 2) {
  newValues[1] = 0;
 } else {
  newValues[1] = r;
 }
 if (zeroCheck.g >= 2) {
  newValues[2] = 0;
 } else {
  newValues[2] = g;
 }
 if (zeroCheck.b >= 2) {
  newValues[3] = 0;
 } else {
  newValues[3] = b;
 }

/*  newValues[0] = w;
 newValues[1] = r;
 newValues[2] = g;
 newValues[3] = b;
 */
 zeroCheck.w = 0;
 zeroCheck.r = 0;
 zeroCheck.b = 0;
 zeroCheck.g = 0;
 return this.lightByte.setLightValues(newValues);
}
