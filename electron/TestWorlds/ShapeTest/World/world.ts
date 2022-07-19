import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

await DVEW.$INIT({});

const depth = 32;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;

const buildAll = () => {
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }
};

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
  // DVEW.queues.addWorldColumnToSunLightQue(x, z);
 }
}

const x = 0;
const z = 0;
//await DVEW.queues.runWorldColumnSunLightAndUpateQue();
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 3, 15, 17, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 2, 13, 17, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 1, 11, 17, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 9, 17, 11);

DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 4, 16, 10);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 4, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 2, 17, 10);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 2, 16, 10);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 2, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 0, 17, 10);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 0, 16, 10);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 0, 16, 12);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 0, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -2, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -3, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -4, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -6, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -7, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -8, 16, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -10, 17, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -11, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -12, 17, 11);

DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -14, 16, 11);
DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, -15, 17, 11);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, -16, 16, 11);

//-1 10 0
//0 10 -1
buildAll();

await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, -7, 20, 11);

(self as any).DVEW = DVEW;
