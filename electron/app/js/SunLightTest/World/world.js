import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT({ onReady: () => { } });
let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
        DVEW.queues.addWorldColumnToSunLightQue(x, z);
    }
}
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildWorldColumn(x, z);
    }
}
await DVEW.queues.runWorldColumnSunLightAndUpateQue();
console.log("done");
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildWorldColumn(x, z);
    }
}
self.DVEW = DVEW;
