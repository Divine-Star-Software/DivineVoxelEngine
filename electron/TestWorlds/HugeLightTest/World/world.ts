import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT({
 onReady: () => {},
});

let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
 }
}

/* for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}

await DVEW.queues.awaitAllChunksToBeBuilt(); */

DVEW.queues.runRGBUpdateQue();
await DVEW.queues.awaitAllRGBLightUpdates();
//console.log("start");
DVEW.queues.runRebuildQue();



/* setTimeout(() => {
 DVEW.runRGBLightUpdateQue();
 DVEW.runChunkRebuildQue();
}, 100);
 */

/* for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
} */
