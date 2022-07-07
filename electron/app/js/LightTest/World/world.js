import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT({});
let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
    }
}
DVEW.queues.runRGBUpdateQue();
await DVEW.queues.awaitAllRGBLightUpdates();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildChunk(x, 0, z);
    }
}
const y = 60;
const run = async () => {
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            if (x == startX) {
                await DVEW.worldData.requestVoxelBeRemoved(endX + 7 - 16, y + 7, z + 7);
            }
            await DVEW.worldData.requestVoxelBeRemoved(x + 7 - 16, y + 7, z + 7);
            await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x + 7, y + 7, z + 7);
        }
    }
    run();
};
run();
