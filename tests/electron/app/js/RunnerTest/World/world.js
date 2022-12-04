import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
let startX = -32;
let startZ = -128;
let endX = 48;
let endZ = 512;
let type = "track";
for (let x = startX; x < endX; x += 16) {
    if (x == -32 || x == 32)
        type = "wall";
    if (x == -16 || x == 16)
        type = "trench";
    if (x == 0)
        type = "track";
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z, type);
    }
}
await tasks.light.rgb.update.runAndAwait();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
