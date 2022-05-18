import { DVEW } from "../../../out/index.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW, "global");

const worldGen = new WorldGen(DVEW);

const start = () => {
 let startX = -128;
 let startZ = -128;
 let endX = 128;
 let endZ = 128;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   worldGen.generateChunk(x, z);
  }
 }

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
