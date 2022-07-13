import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW);

await DVEW.$INIT({});
const topBottomTest = async () => {
 let startX = -16;
 let startZ = -16;
 let endX = 16;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 0);
  }
 }
 await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 0, 16, 0);
};

const northSouthTest = async () => {
 let startX = -48;
 let startZ = -16;
 let endX = -16;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 1);
  }
 }
 await DVEW.worldData.requestVoxelAdd(
  "dve:debugbox",
  "default", 0,
  startX + 16,
  16,
  1
 );
};

const eastWestTest = async () => {
 let startX = 16;
 let startZ = -16;
 let endX = 48;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 2);
  }
 }
 await DVEW.worldData.requestVoxelAdd(
  "dve:debugbox",
  "default", 0,
  startX + 14,
  16,
  0
 );
};

topBottomTest();
northSouthTest();
eastWestTest();

(self as any).DVEW = DVEW;
