import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

RegisterVoxels(DVEW);

await DVEW.$INIT({});
console.log("start");
DVEW.matrixCentralHub.syncGlobalVoxelPalette();

WorldGen.generateChunk(0, 0);
WorldGen.generateChunk(-16, 0);
WorldGen.generateChunk(16, 0);
WorldGen.generateChunk(0, 16);
WorldGen.generateChunk(0, -16);

WorldGen.generateChunk(-16, 16);
WorldGen.generateChunk(16, 16);
WorldGen.generateChunk(16, -16,);
WorldGen.generateChunk(-16, -16);

let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
for (let x = startX; x <= endX; x += 16) {
 for (let z = startZ; z <= endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}
DVEW.buildChunk(0, 0, 0);

(self as any).DVEW = DVEW;
