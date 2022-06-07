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
    onReady: () => { },
});
let startX = -32;
let startZ = -32;
let endX = 32;
let endZ = 32;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
        DVEW.queues.addWorldColumnToSunLightQue(x, z);
    }
}
//await DVEW.queues.runWorldColumnSunLightAndUpateQue();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildWorldColumn(x, z);
    }
}
const x = 0;
const z = 0;
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x, 6, z);
await DVEW.worldData.requestVoxelAdd("dve:dreamlamp", "default", x - 6, 6, z);
await DVEW.worldData.requestVoxelAdd("dve:dreamlamp", "default", x + 6, 6, z);
/* setTimeout(async () => {
 await DVEW.worldData.requestVoxelBeRemoved(x, 6, z);
}, 1000);
 */ 
