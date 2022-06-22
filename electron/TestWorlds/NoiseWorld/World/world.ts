import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { DVEM } from "../../../out/Math/DivineVoxelEngineMath.js";

RegisterVoxels(DVEW);

await DVEW.$INIT({
 onReady: () => {},
});
DVEW.matrixCentralHub.syncGlobalVoxelPalette();

let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;

for (let x = startX; x <= endX; x += 16) {
 for (let z = startZ; z <= endZ; z += 16) {
  WorldGen.generateChunk(x, z);
 }
}

for (let x = startX; x <= endX; x += 16) {
 for (let z = startZ; z <= endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}

(self as any).DVEW = DVEW;
