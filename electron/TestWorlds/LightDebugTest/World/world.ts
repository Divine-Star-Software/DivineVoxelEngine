import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

/*  DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z);
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x + 5, 6, z);
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x - 5, 6, z);
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z + 5);
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z - 5); */

//DVEW.runChunkRebuildQue();

await DVEW.$INIT({
 onReady: () => {},
});

const depth = 32;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
  DVEW.queues.addWorldColumnToSunLightQue(x, z);
 }
}

const x = 0;
const z = 0;
await DVEW.queues.runWorldColumnSunLightAndUpateQue();
console.log("done");

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}
await DVEW.worldData.requestVoxelBeRemoved(x, 10, z);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x, 11, z);
setTimeout(() => {
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }
 console.log("build");
}, 2000);
(self as any).DVEW = DVEW;
