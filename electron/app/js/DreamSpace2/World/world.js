import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
const tasks = DVEW.getTasksManager();
const builder = DVEW.getBuilder();
const depth = 128;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
        tasks.light.worldSun.add(x, z);
    }
}
await tasks.light.worldSun.runAndAwait();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
await tasks.light.rgb.update.runAndAwait();
await tasks.build.chunk.runAndAwait();
self.DVEW = DVEW;
