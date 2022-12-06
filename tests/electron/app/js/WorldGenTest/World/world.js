import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
let depth = 16;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
const tasks = DVEW.getTasksTool();
const builder = DVEW.getBuilder();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        tasks.generate.async.add(x, 0, z);
    }
}
await tasks.generate.async.runAndAwait();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
self.DVEW = DVEW;
