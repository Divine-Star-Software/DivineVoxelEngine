import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen.js";

RegisterVoxels(DVEW);
const depth = 64;
await DVEW.$INIT();
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;

const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generate(x, 0, z);
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
//await tasks.flow.update.runAndAwait();
(self as any).DVEW = DVEW;
