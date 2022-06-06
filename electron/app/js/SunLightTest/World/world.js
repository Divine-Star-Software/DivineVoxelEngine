import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen.js";
RegisterVoxels(DVEW);
const depth = 64;
const fillWorldColumns = () => {
    let startX = -depth - 16;
    let startZ = -depth - 16;
    let endX = depth + 16;
    let endZ = depth + 16;
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.worldData.fillWorldCollumnWithChunks(x, z);
            DVEW.queues.addWorldColumnToSunLightQue(x, z);
        }
    }
};
await DVEW.$INIT({ onReady: () => { } });
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
let t1 = performance.now();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
    }
}
fillWorldColumns();
let t2 = performance.now();
console.log("world gen time");
console.log(t2 - t1);
t1 = performance.now();
await DVEW.queues.runWorldColumnSunLightAndUpateQue();
t2 = performance.now();
console.log("sun light time");
console.log(t2 - t1);
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
self.DVEW = DVEW;
