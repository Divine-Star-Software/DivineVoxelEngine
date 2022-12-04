import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
let startX = -32;
let startZ = -32;
let endX = 32;
let endZ = 32;
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
    }
}
await tasks.light.rgb.update.runAndAwait();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
DVEW.nexusComm.sendMessage("done", []);
self.DVEW = DVEW;
