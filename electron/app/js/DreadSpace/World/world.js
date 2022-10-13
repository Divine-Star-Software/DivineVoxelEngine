import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen.js";
RegisterVoxels(DVEW);
const depth = 64;
await DVEW.$INIT({});
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generate(x, 0, z);
        DVEW.queues.worldSun.add(x, z);
    }
}
WorldGen.generateFountian(0, 40, 16);
await DVEW.queues.worldSun.run();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildWorldColumn(x, z);
    }
}
await DVEW.queues.rgb.update.runAndAwait();
await DVEW.queues.build.chunk.runAndAwait();
await DVEW.queues.flow.update.runAndAwait();
self.DVEW = DVEW;
