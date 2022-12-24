import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
self.DVEW = DVEW;
let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;
RegisterVoxels(DVEW);
await DVEW.$INIT();
const brush = DVEW.getBrush();
brush
    .setId("dve_liquiddreamether")
    .setXYZ(-10, 38, -10)
    .paint()
    .setId("dve_liquiddreadether")
    .setXYZ(12, 38, 9)
    .paint();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        WorldGen.generateChunk(x, z);
    }
}
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        builder.setXZ(x, z).fillColumn().buildColumn();
    }
}
setTimeout(async () => {
    tasks.flow.update.add(12, 38, 9);
    await tasks.flow.update.runAndAwait();
}, 2000);
