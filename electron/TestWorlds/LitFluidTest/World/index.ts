import { DVEW } from "../../../out/index.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW);

const start = () => {
 let startX = -16;
 let startZ = -16;
 let endX = 16;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z);
  }
 }

 const x = 0;
 const z = 0;
 DVEW.worldData.setData(x, 7, z, DVEW.worldGeneration.paintVoxel(1));
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 7, z);

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }
};

(async () => {
 await DVEW.$INIT({
  onReady: start,
 });
})();
