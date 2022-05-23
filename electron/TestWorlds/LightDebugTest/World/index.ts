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

let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
 }
}

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}

const x = 0;
const z = 0;
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x, 6, z);

setTimeout(async ()=>{
    console.log("remove");
    await DVEW.worldData.requestVoxelBeRemoved(x, 6, z);
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(false,x,6,z);
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemove();
},1000)