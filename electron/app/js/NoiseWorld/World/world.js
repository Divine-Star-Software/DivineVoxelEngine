import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksManager();
let startX = -128;
let startZ = -128;
let endX = 128;
let endZ = 128;
let t1 = performance.now();
console.log("start");
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        WorldGen.generateChunk(x, z);
        tasks.light.worldSun.add(x, z);
    }
}
console.log("done");
let t2 = performance.now();
console.log(t2 - t1);
await tasks.light.worldSun.runAndAwait();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
console.log("done");
self.DVEW = DVEW;
