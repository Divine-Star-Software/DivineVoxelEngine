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
 let t0 = 0,
  t1 = 0;
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   // t0 = performance.now();
   worldGen.lightTest(x, 0, z, 7, 7, 5, 8);
   // t1 = performance.now();
   // const at = t1 - t0;
   // ats.push(at);
   // console.log("time a" + at);

   worldGen.lightTest(x, 0, z, 7, 7, 45, 8);
  }
 }

 /*  let aSum = 0;
 for (const at of ats) {
  aSum += at;
 }

 console.log(maxA, minA);
 console.log(aSum / ats.length); */

 const chunkBuildTimes = [];
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   t0 = performance.now();
   DVEW.buildChunk(x, 0, z);
   t1 = performance.now();
   const bt = t1 - t0;
   chunkBuildTimes.push(t1 - t0);
   console.log(bt);
  }
 }
 let bctSum = 0;
 for (const bt of chunkBuildTimes) {
  bctSum += bt;
 }
 console.log("AVERAGE");
 console.log(bctSum / chunkBuildTimes.length);

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
