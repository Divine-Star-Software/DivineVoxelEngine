import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
import { WorldData } from "../WorldData";

export function CalculateVoxelLight(
 this: WorldData,
 voxel: VoxelInteface,
 voxelData: any[],
 voxelPallet: VoxelPallet,
 lightTemplate: number[],
 exposedFaces: number[],
 chunkX: number,
 chunkZ: number,
 x: number,
 y: number,
 z: number
) {
 x += chunkX;
 z += chunkZ;

 // +y
 if (exposedFaces[0]) {
  lightTemplate.push(
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, -1, -1, 0, 0, 0, 0, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, 1, -1, 0, 0, 0, 0, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, 1, 1, 0, 0, 0, 0, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, -1, 1, 0, 0, 0, 0, -1]
   )
  );
 }

 // -y
 if (exposedFaces[1]) {
  lightTemplate.push(
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [0, -1, -1, -1, -1, 0, -1, -1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [0, -1, -1, 1, -1, 0, 1, -1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [0, -1, 1, 1, -1, 0, 1, -1, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
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
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, -1, 1, 1, 0, 1, 1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, 1, 1, 1, 0, 1, 1, 1]
   ),

   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, 1, 1, -1, 0, 1, -1, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, -1, 1, -1, 0, 1, -1, -1]
   )
  );
 }

 // -x
 if (exposedFaces[3]) {
  lightTemplate.push(
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, 1, -1, 1, 0, -1, 1, 1]
   ),

   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, -1, -1, 1, 0, -1, 1, -1]
   ),

   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, -1, -1, -1, 0, -1, -1, -1]
   ),

   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, 1, -1, -1, 0, -1, -1, 1]
   )
  );
 }

 // -z
 if (exposedFaces[4]) {
  lightTemplate.push(
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, -1, 0, 1, -1, -1, 1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, -1, 0, 1, -1, 1, 1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, -1, 0, -1, -1, 1, -1, -1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
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
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, 1, 0, 1, 1, 1, 1, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, 1, 0, 1, 1, -1, 1, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [-1, 0, 1, 0, -1, 1, -1, -1, 1]
   ),
   this.voxelLightMixCalc(
    voxelData,
    voxel,
    voxelPallet,
    x,
    y,
    z,
    [1, 0, 1, 0, -1, 1, 1, -1, 1]
   )
  );
 }
}

export function VoxelLightMixCalcO(
 this: WorldData,
 voxel: VoxelInteface,
 voxelPallet: VoxelPallet,
 blockX: number,
 blockY: number,
 blockZ: number,
 x: number,
 y: number,
 z: number
) {
 const check = this.getRealtiveVoxelData(
  blockX,
  blockY,
  blockZ,

  x,
  y,
  z
 );
 if (!check) {
  return 1;
 }

 const voxelPalletId = check[0];
 const voxelTrueId = voxelPallet[voxelPalletId][0];
 const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);

 if (checkVoxel.data.substance !== voxel.data.substance) {
  return 1;
 }

 return 0.75;
}

export function VoxelLightMixCalc(
 this: WorldData,
 voxelData: any[],
 voxel: VoxelInteface,
 voxelPallet: VoxelPallet,
 blockX: number,
 blockY: number,
 blockZ: number,
 checkSet: number[]
) {
 let voxelLigtValue: number = voxelData[voxelData.length - 1];

 this.infoByte.setNumberValue(voxelLigtValue);

 let w = this.infoByte.getHalfByteDec(0);

 let r = this.infoByte.getHalfByteDec(4);
 let g = this.infoByte.getHalfByteDec(8);
 let b = this.infoByte.getHalfByteDec(12);

 for (let i = 0; i < checkSet.length; i += 3) {
  const check = this.getRealtiveVoxelData(
   blockX,
   blockY,
   blockZ,

   checkSet[i],
   checkSet[i + 1],
   checkSet[i + 2]
  );

  if (!check) {
   continue;
  }

  const voxelPalletId = check[0];
  const voxelTrueId = voxelPallet[voxelPalletId][0];
  const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);
  if (checkVoxel.data.substance !== voxel.data.substance) {
   continue;
  }
  let neighborLightValue: number = check[check.length - 1];
  this.infoByte.setNumberValue(neighborLightValue);
  let nw = this.infoByte.getHalfByteDec(0);

  if (nw < w && w > 0) {
   w--;
  }
  if (nw > w && w < 15) {
   w++;
  }

  let nr = this.infoByte.getHalfByteDec(4);

  if (nr < r && r > 0) {
   r--;
  }
  if (nr > r && r < 15) {
   r++;
  }
  let ng = this.infoByte.getHalfByteDec(8);
  if (ng < g && g > 0) {
   g--;
  }
  if (ng > g && g < 15) {
   g++;
  }
  let nb = this.infoByte.getHalfByteDec(12);
  if (nb < b && b > 0) {
   b--;
  }
  if (nb > b && b < 15) {
   b++;
  }
 }
 this.infoByte.setNumberValue(0);
 this.infoByte.setHalfByteBits(0, w);
 this.infoByte.setHalfByteBits(4, r);
 this.infoByte.setHalfByteBits(8, g);
 this.infoByte.setHalfByteBits(12, b);
 return this.infoByte.getNumberValue();
}
