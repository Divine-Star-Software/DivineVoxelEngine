import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
import { WorldData } from "../WorldData";

export function CalculateVoxelRGBLight(
 this: WorldData,
 voxel: VoxelInteface,
 voxelData: any[],
 voxelPallet: VoxelPallet,
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
  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 1, 1, -1, 1, 0, 0, 1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 1, 1, -1, 1, 0, 0, 1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 1, -1, 1, 1, 0, 0, 1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 1, -1, 1, 1, 0, 0, 1, -1]
   )
  );
 }

 // -y
 if (exposedFaces[1]) {
  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, -1, -1, -1, 0, -1, -1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, -1, 1, -1, 0, 1, -1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [0, -1, 1, 1, -1, 0, 1, -1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
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


  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, -1, 1, 0, -1, 1, -1]
   ),

   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, -1, 1, 0, -1, 1, 1]
   ),

   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, -1, -1, 0, -1, -1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, -1, -1, 0, -1, -1, -1]
   )
  );
 }

 // -x
 if (exposedFaces[3]) {
  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 1, 1, 0, 1, 1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, 1, 1, 0, 1, 1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, 1, -1, 0, 1, -1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 1, -1, 0, 1, -1, 1]
   )
  );
 }

 // -z
 if (exposedFaces[4]) {
  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, -1, 0, 1, -1, -1, 1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 0, 1, -1, 1, 1, -1]
   ),

   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, -1, 0, -1, -1, 1, -1, -1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
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

  lightTemplate.push(
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [1, 0, 1, 0, 1, 1, 1, 1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 0, 1, 1, -1, 1, 1]
   ),
   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    chunkX,
    chunkY,
    chunkZ,
    x,
    y,
    z,
    [-1, 0, 1, 0, -1, 1, -1, -1, 1]
   ),

   this.voxelSunLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
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
export function VoxelSunLightMixCalc(
 this: WorldData,
 voxelData : any[],
 voxel: VoxelInteface,
 voxelPallet: VoxelPallet,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 voxelX: number,
 voxelY: number,
 voxelZ: number,
 checkSet: number[]
) {
 let voxelLigtValue: number = voxelData[voxelData.length - 1];

 const values = this.lightByte.getLightValues(voxelLigtValue);
 let w = values[0];
 let r = values[1];
 let g = values[2];
 let b = values[3];
 //console.log(w);
 for (let i = 0; i < 9; i += 3) {
  /*    const check = this.getRelativeVoxelData(
   chunkX,
   chunkY,
   chunkZ,
   voxelX,
   voxelY,
   voxelZ,
   checkSet[i],
   checkSet[i + 1],
   checkSet[i + 2]
  );   */

  const check = this.getData(
   checkSet[i] + chunkX + voxelX,
   checkSet[i + 1] + chunkY + voxelY,
   checkSet[i + 2] + chunkZ + voxelZ
  );

  if (!check) {
   continue;
  }

  let neighborLightValue: number;
  if (check[0] < 0) {
   neighborLightValue = check[check.length - 1];
  } else {
   const voxelTrueId = voxelPallet[check[0]][0];
   const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);
   if (checkVoxel.data.substance == "solid") {
    continue;
   }
   neighborLightValue = check[check.length - 1];
  }

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

 return this.lightByte.setLightValues([w, r, g, b]);
}
