import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen.js";

RegisterVoxels(DVEW);
await DVEW.$INIT();
const tasks = DVEW.getTasksTool();
const builder = DVEW.getBuilder();
const depth = 128;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
for (let x = startX - 16; x < endX + 16; x += 16) {
 for (let z = startZ - 16; z < endZ + 16; z += 16) {
  builder.setXZ(x, z).fillColumn();
  tasks.light.worldSun.add(x, z);
 }
}

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
 }
}

await tasks.light.worldSun.runAndAwait();

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  builder.setXZ(x, z).buildColumn();
 }
}

GetAnalyzerCubeWorld(DVEW);
await tasks.light.rgb.update.runAndAwait();
await tasks.build.chunk.runAndAwait();


(self as any).DVEW = DVEW;
