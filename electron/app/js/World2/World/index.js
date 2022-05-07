import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures-o.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/index.js";
RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");
const worldGen = new WorldGen(DVEW);
await DVEW.$INIT({
    onReady: () => { },
});
console.log("not read");
DVEW.matrixCentralHub.syncGlobalVoxelPalette();
const chunk = worldGen.generateChunk(0, 0);
DVEW.worldData.setChunk(0, 0, 0, chunk);
const chunk2 = worldGen.generateChunk(-16, 0);
DVEW.worldData.setChunk(-16, 0, 0, chunk2);
const chunk3 = worldGen.generateChunk(16, 0);
DVEW.worldData.setChunk(16, 0, 0, chunk3);
const chunk4 = worldGen.generateChunk(0, 16);
DVEW.worldData.setChunk(0, 0, 16, chunk4);
const chunk5 = worldGen.generateChunk(0, -16);
DVEW.worldData.setChunk(0, 0, -16, chunk5);
DVEW.worldData.setChunk(-16, 0, 16, worldGen.generateChunk(-16, 16, "pillar"));
DVEW.worldData.setChunk(16, 0, 16, worldGen.generateChunk(16, 16));
DVEW.worldData.setChunk(16, 0, -16, worldGen.generateChunk(16, -16, "pillar"));
DVEW.worldData.setChunk(-16, 0, -16, worldGen.generateChunk(-16, -16));
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        DVEW.buildChunk(x, 0, z);
    }
}
/* DVEW.builderCommManager.builders[0].sendMessage("done", []);
DVEW.builderCommManager.builders[1].sendMessage("done", []);
DVEW.builderCommManager.builders[2].sendMessage("done", []);
DVEW.builderCommManager.builders[3].sendMessage("done", []);
 */ 
