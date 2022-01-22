import { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

const DVEW = new DivineVoxelEngineWorld(self as any);

(self as any).DVEW = DVEW;

RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");

const worldGen = new WorldGen(DVEW);

const start = () => {
 let startX = -64;
 let startZ = -64;
 let endX = 64;
 let endZ = 64;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   (async () => {
    DVEW.worldData.setChunk(x, 0, z, worldGen.generateChunk(x, 0, z));
   })();
  }
 }
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }

 let maxA = 0;
 let maxB = 0;
 let minA = Number.MAX_SAFE_INTEGER;
 let minB = Number.MAX_SAFE_INTEGER;
 let ats: number[] = [];
 let bts: number[] = [];
 let t0 = 0,
  t1 = 0;
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   t0 = performance.now();
   worldGen.lightTest(x, 0, z, 7, 7, 5, 8);
   t1 = performance.now();
   const at = t1 - t0;
   ats.push(at);
   console.log("time a" + at);

   t0 = performance.now();
   worldGen.lightTestA(x, 0, z, 7, 7, 5, 8);
   t1 = performance.now();
   const bt = t1 - t0;
   bts.push(bt);
   console.log("time b" + bt);

   if (maxA < at) {
    maxA = at;
   }
   if (maxB < bt) {
    maxB = bt;
   }
   if (minA > at) {
    minA = at;
   }
   if (minB > bt) {
    minB = bt;
   }

   worldGen.lightTest(x, 0, z, 7, 7, 45, 8);
   DVEW.buildChunk(x, 0, z);
   DVEW.buildChunk(x + 16, 0, z);
   DVEW.buildChunk(x - 16, 0, z);
   DVEW.buildChunk(x, 0, z + 16);
   DVEW.buildChunk(x, 0, z - 16);
   /*    worldGen.lightTest(x, 0, z, 7, 7, 15, 9);
   worldGen.lightTest(x, 0, z, 7, 7, 25, 9);
   worldGen.lightTest(x, 0, z, 7, 7, 35, 9);

   worldGen.lightTest(x, 0, z, 7, 7, 45, 9);
   worldGen.lightTest(x, 0, z, 7, 7, 55, 9);
   worldGen.lightTest(x, 0, z, 7, 7, 65, 9); */
  }
 }

 let aSum = 0;
 for (const at of ats) {
  aSum += at;
 }
 let bSum = 0;
 for (const bt of bts) {
  bSum += bt;
 }
 console.log(maxA, minA, maxB, minB);
 console.log(aSum / ats.length, bSum / bts.length);

 /*  for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   (async () => {
    // const t0 = performance.now();
    DVEW.buildChunk(x, 0, z);
    //  const t1 = performance.now();
    //  console.log("chunk build time " + (t1 - t0));
   })();
  } */

 DVEW.buildFluidMesh();
};

(async () => {
 await DVEW.$INIT({
  voxelPalletMode: "global",
  onReady: start,
  onMessage: (message: string, data: any[]) => {},
 });
})();
