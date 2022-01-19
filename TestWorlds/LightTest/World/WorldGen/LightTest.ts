import { InfoByte } from "../../../../out/Global/Util/InfoByte";
import { WorldGen } from "./WorldGen";

export function LightTest(
 this: WorldGen,
 chunkVoxels: any[][][],
 startX: number,
 startZ: number,
 startY: number,
 radius: number
) {
 if (
  chunkVoxels[startX] &&
  chunkVoxels[startX][startZ] &&
  chunkVoxels[startX][startZ][startY]
 ) {
  const data = chunkVoxels[startX][startZ][startY];
  this.infoByte.setNumberValue(0);
  this.infoByte.setHalfByteBits(0, 15);
  this.infoByte.setHalfByteBits(4, 15);
  this.infoByte.setHalfByteBits(8, 15);
  this.infoByte.setHalfByteBits(12, 15);
  data[data.length - 1] = this.infoByte.getNumberValue();
 }

 /*  let startLevel = 15;
 let lightLevel = 15;
 for (let x = startX; x > startX - radius; x--) {
  startLevel--;
  lightLevel = startLevel;
  let k = 0;
  for (let z = startZ; z > startZ - radius; z--) {
   lightLevel--;
   k++;

   if (chunkVoxels[x] && chunkVoxels[x][z] && chunkVoxels[x][z][startY]) {
    const data = chunkVoxels[x][z][startY];
    this.infoByte.setNumberValue(0);
    this.infoByte.setHalfByteBits(0, lightLevel);
    this.infoByte.setHalfByteBits(4, lightLevel);
    this.infoByte.setHalfByteBits(8, lightLevel);
    this.infoByte.setHalfByteBits(12, lightLevel);
    data[data.length - 1] = this.infoByte.getNumberValue();
   }

  }
 } */

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

 let startLevel = 15;
 let lightLevel = 15;
 for (let j = 0; j < radius; j++) {
  startLevel--;
  lightLevel = startLevel;
  let k = 0;

  for (let k = 0; k < radius; k++) {
   lightLevel--;
   if (!lightLevel) break;
   let z = startZ + k;
   let x = startX + j;
   if (chunkVoxels[x] && chunkVoxels[x][z] && chunkVoxels[x][z][startY]) {
    const data = chunkVoxels[x][z][startY];

    data[data.length - 1] = colorFunctions[color](lightLevel, this.infoByte);
   }
   z = startZ - k;
   if (chunkVoxels[x] && chunkVoxels[x][z] && chunkVoxels[x][z][startY]) {
    const data = chunkVoxels[x][z][startY];
    data[data.length - 1] = colorFunctions[color](lightLevel, this.infoByte);
   }

   z = startZ + k;
   x = startX - j;
   if (chunkVoxels[x] && chunkVoxels[x][z] && chunkVoxels[x][z][startY]) {
    const data = chunkVoxels[x][z][startY];
    data[data.length - 1] = colorFunctions[color](lightLevel, this.infoByte);
   }
   z = startZ - k;
   if (chunkVoxels[x] && chunkVoxels[x][z] && chunkVoxels[x][z][startY]) {
    const data = chunkVoxels[x][z][startY];
    data[data.length - 1] = colorFunctions[color](lightLevel, this.infoByte);
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
  infoByte.setHalfByteBits(0, lightLevel);
  infoByte.setHalfByteBits(4, 0);
  infoByte.setHalfByteBits(8, lightLevel);
  infoByte.setHalfByteBits(12, 0);
  return infoByte.getNumberValue();
 },
 red: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, lightLevel);
  infoByte.setHalfByteBits(4, lightLevel);
  infoByte.setHalfByteBits(8, 0);
  infoByte.setHalfByteBits(12, 0);
  return infoByte.getNumberValue();
 },
 blue: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, lightLevel);
  infoByte.setHalfByteBits(4, 0);
  infoByte.setHalfByteBits(8, 0);
  infoByte.setHalfByteBits(12, lightLevel);
  return infoByte.getNumberValue();
 },
 white: (lightLevel: number, infoByte: InfoByte) => {
  infoByte.setNumberValue(0);
  infoByte.setHalfByteBits(0, lightLevel);
  infoByte.setHalfByteBits(4, lightLevel);
  infoByte.setHalfByteBits(8, lightLevel);
  infoByte.setHalfByteBits(12, lightLevel);
  return infoByte.getNumberValue();
 },
};
