import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();

const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;

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
