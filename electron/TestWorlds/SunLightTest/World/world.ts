import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen.js";

RegisterVoxels(DVEW);

const fillWorldColumns = () => {
 let startX = -64 - 16;
 let startZ = -64 - 16;
 let endX = 64 + 16;
 let endZ = 64 + 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.worldData.fillWorldCollumnWithChunks(x, z);
   DVEW.queues.addWorldColumnToSunLightQue(x, z);
  }
 }
};

await DVEW.$INIT({ onReady: () => {} });

let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
 }
}
fillWorldColumns();
await DVEW.queues.runWorldColumnSunLightAndUpateQue();

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildWorldColumn(x, z);
 }
}
DVEW.queues.runRGBUpdateQue();
await DVEW.queues.awaitAllRGBLightUpdates();
for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildWorldColumn(x, z);
 }
}
(self as any).DVEW = DVEW;
