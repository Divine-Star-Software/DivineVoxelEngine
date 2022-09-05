import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";

RegisterVoxels(DVEW);
RegisterItemData(DVEW);
await DVEW.$INIT({});

(self as any).DVEW = DVEW;
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
const load = () => {
 console.log("load");

 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.buildWorldColumn(x, z);
  }
 }
};

const generate = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.worldData.fillWorldCollumnWithChunks(x, z);
   WorldGen.generateChunk(x, z);
  }
 }
};
generate();

DVEW.worldData.paintVoxel("dve:dreamstone",0,0,3,5,-8);
DVEW.worldData.paintVoxel("dve:dreamstone",0,0,3,6,-8);
DVEW.worldData.paintVoxel("dve:dreamstone",0,0,3,7,-8);
DVEW.worldData.paintVoxel("dve:dreamstone",0,0,3,8,-8);
load();
