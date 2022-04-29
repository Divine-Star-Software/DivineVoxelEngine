import type { VoxelInteface,VoxelData } from "Meta/World/Voxels/Voxel.types";

import {DVEB} from "../../DivineVoxelEngineBuilder.js";
import { VoxelHelper } from "../VoxelHelper.js";

export function CalculateVoxelLight(
 this: VoxelHelper,
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
 // +y
 if (exposedFaces[0]) {
  let light = this.getLight(x + chunkX, y + chunkY + 1, z + chunkZ);
  const ly = 1;
  lightTemplate.push(
   //-x -z
   this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
    -1,
    ly,
    0,

    0,
    ly,
    -1,

    -1,
    ly,
    -1,
   ]),
   //-x +z
   this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
    -1,
    ly,
    0,

    0,
    ly,
    1,

    -1,
    ly,
    1,
   ]),

   //+x +z
   this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
    1,
    ly,
    0,

    0,
    ly,
    1,

    1,
    ly,
    1,
   ]),
   //+x -z
   this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
    1,
    ly,
    0,

    0,
    ly,
    -1,

    1,
    ly,
    -1,
   ])
  );
 }

 // -y
 if (exposedFaces[1]) {
  let airLight = this.getLight(x + chunkX, y + chunkY - 1, z + chunkZ);
  lightTemplate.push(
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, -1, -1, -1, 0, -1, -1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, -1, 1, -1, 0, 1, -1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, 1, 1, -1, 0, 1, -1, 1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, 1, -1, -1, 0, -1, -1, 1]
   )
  );
 }

 // +x
 if (exposedFaces[2]) {
  let airLight = this.getLight(x + chunkX + 1, y + chunkY, z + chunkZ);
  lightTemplate.push(
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 1, 1, 0, 1, 1, -1]
   ),

   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, 1, 1, 1, 0, 1, 1, 1]
   ),

   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, 1, 1, -1, 0, 1, -1, 1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 1, -1, 0, 1, -1, -1]
   )
  );
 }

 // -x
 if (exposedFaces[3]) {
  let airLight = this.getLight(x + chunkX - 1, y + chunkY, z + chunkZ);
  lightTemplate.push(
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, -1, 1, 0, -1, 1, 1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, -1, 1, 0, -1, 1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, -1, -1, 0, -1, -1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, -1, -1, 0, -1, -1, 1]
   )
  );
 }

 // -z
 if (exposedFaces[4]) {
  let airLight = this.getLight(x + chunkX, y + chunkY, z + chunkZ - 1);
  lightTemplate.push(
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, 0, 1, -1, -1, 1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 0, 1, -1, 1, 1, -1]
   ),

   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 0, -1, -1, 1, -1, -1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, 0, -1, -1, -1, -1, -1]
   )
  );
 }
 // +z
 if (exposedFaces[5]) {
  let airLight = this.getLight(x + chunkX, y + chunkY, z + chunkZ + 1);

  lightTemplate.push(
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, 1, 0, 1, 1, 1, 1, 1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 0, 1, 1, -1, 1, 1]
   ),
   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 0, -1, 1, -1, -1, 1]
   ),

   this.voxellightMixCalc(
    airLight,
    voxel,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, 1, 0, -1, 1, 1, -1, 1]
   )
  );
 }
}
export function VoxelLightMixCalc(
 this: VoxelHelper,
 voxelLigtValue: number,
 voxel: VoxelData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 voxelX: number,
 voxelY: number,
 voxelZ: number,
 checkSet: number[]
) {
 const values = this.lightByte.getLightValues(voxelLigtValue);
 let w = values[0];
 let r = values[1];
 let g = values[2];
 let b = values[3];

 //console.log(w);

 const zeroCount = {
  w: 0,
  r: 0,
  g: 0,
  b: 0,
 };

 if (w == 0) {
  zeroCount.w++;
 }
 if (r == 0) {
  zeroCount.r++;
 }

 if (g == 0) {
  zeroCount.g++;
 }

 if (b == 0) {
  zeroCount.b++;
 }

 for (let i = 6; i > 0; i -= 3) {
  const check = this.getLight(
   checkSet[i] + chunkX + voxelX,
   checkSet[i + 1] + chunkY + voxelY,
   checkSet[i + 2] + chunkZ + voxelZ
  );

  if (!check) {
   continue;
  }

  let neighborLightValue: number = check;
  const values = this.lightByte.getLightValues(neighborLightValue);
  let nw = values[0];
  let nr = values[1];
  let ng = values[2];
  let nb = values[3];

  if (nw < w && w > 0) {
   w--;
  }
  if (nw > w && w < 15) {
   w++;
  }
  if (nw == 0) {
   zeroCount.w++;
  }

  if (nr < r && r > 0) {
   r--;
  }
  if (nr > r && r < 15) {
   r++;
  }
  if (nr == 0) {
   zeroCount.r++;
  }

  if (ng < g && g > 0) {
   g--;
  }
  if (ng > g && g < 15) {
   g++;
  }
  if (ng == 0) {
   zeroCount.g++;
  }

  if (nb < b && b > 0) {
   b--;
  }
  if (nb > b && b < 15) {
   b++;
  }

  if (nb == 0) {
   zeroCount.b++;
  }
 }

 if (zeroCount.w >= 2) {
  w = 0;
 }
 if (zeroCount.r >= 2) {
  r = 15;
  //console.log(zeroCount);
 }
 if (zeroCount.g >= 2) {
  g = 0;
 }
 if (zeroCount.b >= 2) {
  b = 0;
 }
 return this.lightByte.setLightValues([w, r, g, b]);
}
