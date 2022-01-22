import { InfoByte } from "../../../../out/Global/Util/InfoByte";
import { LightByte } from "../../../../out/Global/Util/LightByte";
import { WorldData } from "../../../../out/World/WorldData/WorldData";
import { WorldGen } from "./WorldGen";
/**
 * Note to self for light removel.
 * When going through the voxels to updated set the voxel
 * light level to be the brigthest neighbor minus 1.
 *
 *
 *
 * New idea for light system.
 * Each air data is set to be its brightest cardinal + top/bottom neighbor minus -1
 * If the loop encounters a block the loop stops for that specfic z axis and goes to the next.
 * On each loop when the air block is updated it also updates any air blocks below it.
 */

const copy = (data: any) => {
 return [...data];
};

const air = [-1, -1];

const checkNeighbors = (
 x: number,
 y: number,
 z: number,
 lightByte: LightByte,
 worldData: WorldData
) => {
 let vox;
 if ((vox = worldData.getData(x - 1, y, z))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x - 1, y, z, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x - 1, y, z, lightByte, worldData);
 }
 if ((vox = worldData.getData(x + 1, y, z))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x + 1, y, z, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x + 1, y, z, lightByte, worldData);
 }
 if ((vox = worldData.getData(x, y - 1, z))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x, y - 1, z, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x, y - 1, z, lightByte, worldData);
 }
 if ((vox = worldData.getData(x, y + 1, z))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x, y + 1, z, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x, y + 1, z, lightByte, worldData);
 }
 if ((vox = worldData.getData(x, y, z - 1))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x, y, z - 1, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x, y, z - 1, lightByte, worldData);
 }
 if ((vox = worldData.getData(x, y, z + 1))) {
  if (vox[0] < 0) {
   updateAirLightBlock(vox, x, y, z + 1, lightByte, worldData);
  }
 } else {
  setAirLightBlock(x, y, z + 1, lightByte, worldData);
 }
};
const updateAirLightBlock = (
 airBlock: any[],
 x: number,
 y: number,
 z: number,
 lightByte: LightByte,
 worldData: WorldData
) => {
 const airLightInfo = lightByte.getLightValues(airBlock[airBlock.length - 1]);
 let w = airLightInfo[0];
 let cr = airLightInfo[1] + 1;
 let cg = airLightInfo[2] + 1;
 let cb = airLightInfo[3] + 1;

 const checkX1 = worldData.getData(x - 1, y, z);
 if (checkX1) {
  if (checkX1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkX1[checkX1.length - 1]);

   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }

 const checkX2 = worldData.getData(x + 1, y, z);
 if (checkX2) {
  if (checkX2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkX2[checkX2.length - 1]);

   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }
 const checkZ1 = worldData.getData(x, y, z - 1);
 if (checkZ1) {
  if (checkZ1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkZ1[checkZ1.length - 1]);
   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }
 const checkZ2 = worldData.getData(x, y, z + 1);
 if (checkZ2) {
  if (checkZ2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkZ2[checkZ2.length - 1]);

   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }
 const checkY1 = worldData.getData(x, y - 1, z);
 if (checkY1) {
  if (checkY1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkY1[checkY1.length - 1]);
   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }
 const checkY2 = worldData.getData(x, y + 1, z);
 if (checkY2) {
  if (checkY2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkY2[checkY2.length - 1]);
   if (cr < lightColorInfo[1]) {
    cr = lightColorInfo[1];
   }
   if (cg < lightColorInfo[2]) {
    cg = lightColorInfo[2];
   }
   if (cb < lightColorInfo[3]) {
    cb = lightColorInfo[3];
   }
  }
 }
 if (cr <= 0) {
  cr = 0;
 } else {
  cr--;
 }
 if (cg <= 0) {
  cg = 0;
 } else {
  cg--;
 }
 if (cb <= 0) {
  cb = 0;
 } else {
  cb--;
 }

 air[air.length - 1] = lightByte.setLightValues([w, cr, cg, cb]);
 worldData.setData(x, y, z, air);
};
const setAirLightBlock = (
 x: number,
 y: number,
 z: number,
 lightByte: LightByte,
 worldData: WorldData
) => {
 air[air.length - 1] = 0;

 let w = 0;
 let cr = 0;
 let cg = 0;
 let cb = 0;
 let set = false;

 const checkX1 = worldData.getData(x - 1, y, z);
 if (checkX1) {
  if (checkX1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkX1[checkX1.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }

 const checkX2 = worldData.getData(x + 1, y, z);
 if (checkX2) {
  if (checkX2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkX2[checkX2.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    set = true;
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }
 const checkZ1 = worldData.getData(x, y, z - 1);
 if (checkZ1) {
  if (checkZ1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkZ1[checkZ1.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    set = true;
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }
 const checkZ2 = worldData.getData(x, y, z + 1);
 if (checkZ2) {
  if (checkZ2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkZ2[checkZ2.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    set = true;
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }
 const checkY1 = worldData.getData(x, y - 1, z);
 if (checkY1) {
  if (checkY1[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkY1[checkY1.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    set = true;
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }
 const checkY2 = worldData.getData(x, y + 1, z);
 if (checkY2) {
  if (checkY2[0] < 0) {
   const lightColorInfo = lightByte.getLightValues(checkY2[checkY2.length - 1]);
   if (set) {
    if (cr < lightColorInfo[1]) {
     cr = lightColorInfo[1];
    }
    if (cg < lightColorInfo[2]) {
     cg = lightColorInfo[2];
    }
    if (cb < lightColorInfo[3]) {
     cb = lightColorInfo[3];
    }
   } else {
    set = true;
    w = lightColorInfo[0];
    cr = lightColorInfo[1];
    cg = lightColorInfo[2];
    cb = lightColorInfo[3];
   }
  }
 }
 if (cr <= 0) {
  cr = 0;
 } else {
  cr--;
 }
 if (cg <= 0) {
  cg = 0;
 } else {
  cg--;
 }
 if (cb <= 0) {
  cb = 0;
 } else {
  cb--;
 }

 air[air.length - 1] = lightByte.setLightValues([w, cr, cg, cb]);
 worldData.setData(x, y, z, air);
};

const lightLevels = {
 q0: {
  x: 0,
  y: 0,
  z: 0,
 },
 q1: {
  x: 0,
  y: 0,
  z: 0,
 },
 q2: {
  x: 0,
  y: 0,
  z: 0,
 },
 q3: {
  x: 0,
  y: 0,
  z: 0,
 },
};
export function LightTest(
 this: WorldGen,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 startX: number,
 startZ: number,
 startY: number,
 radius: number
) {
 let trueStartX = startX + chunkX;
 let trueStartY = startY + chunkY;
 let trueStartZ = startZ + chunkZ;

 const toss = Math.random();

 let color = "white";
 if (toss < 0.2) {
  color = "red";
 }
 if (toss > 0.2 && toss < 0.4) {
  color = "green";
 }
 if (toss > 0.4 && toss < 0.6) {
  color = "blue";
 }

 const data = [1, 0, 0];
 const lightSourceColor = colorFunctions[color](15, this.infoByte);
 const seedLightSourceColor = colorFunctions[color](14, this.infoByte);
 data[data.length - 1] = lightSourceColor;
 this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, data);

 const airSeed = [-1, 0, 0];
 airSeed[data.length - 1] = seedLightSourceColor;
 if (this.DVEW.worldData.getData(trueStartX - 1, trueStartY, trueStartZ)) {
 } else {
  this.DVEW.worldData.setData(trueStartX - 1, trueStartY, trueStartZ, airSeed);
  checkNeighbors(
   trueStartX - 1,
   trueStartY,
   trueStartZ,
   this.lightByte,
   this.DVEW.worldData
  );
 }
 if (this.DVEW.worldData.getData(trueStartX + 1, trueStartY, trueStartZ)) {
 } else {
  this.DVEW.worldData.setData(trueStartX + 1, trueStartY, trueStartZ, airSeed);
  checkNeighbors(
   trueStartX + 1,
   trueStartY,
   trueStartZ,
   this.lightByte,
   this.DVEW.worldData
  );
 }
 if (this.DVEW.worldData.getData(trueStartX, trueStartY - 1, trueStartZ)) {
 } else {
  this.DVEW.worldData.setData(trueStartX, trueStartY - 1, trueStartZ, airSeed);
  checkNeighbors(
   trueStartX,
   trueStartY - 1,
   trueStartZ,
   this.lightByte,
   this.DVEW.worldData
  );
 }

 if (this.DVEW.worldData.getData(trueStartX, trueStartY + 1, trueStartZ)) {
 } else {
  this.DVEW.worldData.setData(trueStartX, trueStartY + 1, trueStartZ, airSeed);
  checkNeighbors(
   trueStartX,
   trueStartY + 1,
   trueStartZ,
   this.lightByte,
   this.DVEW.worldData
  );
 }

 if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ - 1)) {
 } else {
  this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ - 1, airSeed);
  checkNeighbors(
   trueStartX,
   trueStartY,
   trueStartZ - 1,
   this.lightByte,
   this.DVEW.worldData
  );
 }

 if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ + 1)) {
 } else {
  this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ + 1, airSeed);
  checkNeighbors(
   trueStartX,
   trueStartY,
   trueStartZ + 1,
   this.lightByte,
   this.DVEW.worldData
  );
 }

 let vox;
 for (let i = 0; i < radius; i++) {
  for (let j = 0; j < radius; j++) {
   //top
   let y = trueStartY + i;

   let z = trueStartZ;
   let x = trueStartX + j;
   //q0top
   for (let k = 0; k < radius; k++) {
    let q0z = z + k;
    if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
    }
   }
   //q2top
   for (let k = 0; k < radius; k++) {
    let q2z = z - k;
    if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
    }
   }
   x = trueStartX - j;
   //q1top
   for (let k = 0; k < radius; k++) {
    let q1z = z + k;
    if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
    }
   }

   //q3top
   for (let k = 0; k < radius; k++) {
    let q3z = z - k;
    if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
    }
   }

   //bottom
   y = trueStartY - i;

   z = trueStartZ;
   x = trueStartX + j;
   //q0
   for (let k = 0; k < radius; k++) {
    let q0z = z + k;
    if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
    }
   }
   //q2
   for (let k = 0; k < radius; k++) {
    let q2z = z - k;
    if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
    }
   }
   x = trueStartX - j;
   //q1
   for (let k = 0; k < radius; k++) {
    let q1z = z + k;
    if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
    }
   }

   //q3
   for (let k = 0; k < radius; k++) {
    let q3z = z - k;
    if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
     if (vox[0] > 0) {
      break;
     } else {
      updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
      checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
     }
    } else {
     setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
     checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
    }
   }
  }
 }
}

const colorFunctions: Record<
 string,
 (lightLevel: number, infoByte: InfoByte) => number
> = {
 green: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, 0);
  infoByte.setHalfByteBits(4, Math.ceil(Math.random() * lightLevel));
  infoByte.setHalfByteBits(8, 0);
  infoByte.setHalfByteBits(12, Math.ceil(Math.random() * lightLevel));
  return infoByte.getNumberValue();
 },
 red: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, 0);
  infoByte.setHalfByteBits(4,lightLevel);
  infoByte.setHalfByteBits(8, Math.ceil(Math.random() * lightLevel));
  infoByte.setHalfByteBits(12,8);
  return infoByte.getNumberValue();
 },
 blue: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, 0);
  infoByte.setHalfByteBits(4, 5);
  infoByte.setHalfByteBits(8, Math.ceil(Math.random() * lightLevel));
  infoByte.setHalfByteBits(12,4);
  return infoByte.getNumberValue();
 },
 white: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, 0);
  infoByte.setHalfByteBits(4, 3);
  infoByte.setHalfByteBits(8, Math.ceil(Math.random() * lightLevel));
  infoByte.setHalfByteBits(12, Math.ceil(Math.random() * lightLevel));
  return infoByte.getNumberValue();
 },
};
