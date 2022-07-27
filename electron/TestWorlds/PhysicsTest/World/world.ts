import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

await DVEW.$INIT({});
const depth = 16;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
for (let x = startX - 16; x < endX + 16; x += 16) {
 for (let z = startZ - 16; z < endZ + 16; z += 16) {
  DVEW.worldData.fillWorldCollumnWithChunks(x, z);
 }
}

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
 }
}

DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 6, 5);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 7, 4);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 8, 3);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 9, 2);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 10, 1);

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}

(self as any).DVEW = DVEW;
