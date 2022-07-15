import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

let startX = -256;
let startZ = -256;
let endX = 256;
let endZ = 256;
/* let startX = 0;
let startZ = 0;
let endX = 16;
let endZ = 16; */
const generateAsync = async () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.generate(x, z);
  }
 }
 await DVEW.queues.awaitAllGenerationsToBeDone();
};

const generateSync = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   WorldGen.generateChunk(x, z, "default");
  }
 }
};
const load = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.buildWorldColumn(x, z);
  }
 }
};

RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({});

console.log("start");
let t1 = performance.now();
await generateAsync();
//generateSync();
let t2 = performance.now();
console.log(t2 - t1);
console.log("never end");
load();

(self as any).DVEW = DVEW;
