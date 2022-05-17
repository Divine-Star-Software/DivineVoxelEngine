import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/index.js";
RegisterVoxels(DVEW, "global");
const worldGen = new WorldGen(DVEW);
await DVEW.$INIT({
    onReady: () => { },
});
DVEW.matrixCentralHub.syncGlobalVoxelPalette();
worldGen.generateChunk(0, 0);
worldGen.generateChunk(-16, 0);
worldGen.generateChunk(16, 0);
worldGen.generateChunk(0, 16);
worldGen.generateChunk(0, -16);
worldGen.generateChunk(-16, 16, "pillar");
worldGen.generateChunk(16, 16);
worldGen.generateChunk(16, -16, "pillar");
worldGen.generateChunk(-16, -16);
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        DVEW.buildChunk(x, 0, z);
    }
}
