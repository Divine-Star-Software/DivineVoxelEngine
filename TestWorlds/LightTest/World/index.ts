import { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

const DVEW = new DivineVoxelEngineWorld(self as any);

(self as any).DVEW = DVEW;

RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");

const worldGen = new WorldGen(DVEW);

const start = () => {
 let startX = -64;
 let startZ = -64;
 let endX = 64;
 let endZ = 64;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.worldData.setChunk(x, 0, z, worldGen.generateChunk(x, 0, z));
  }
 }

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunkAsync(x, 0, z);
  }
 }

 /*for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   worldGen.lightTest(x, 0, z, 7, 7, 5, 8);
   worldGen.lightTest(x, 0, z, 7, 7, 45, 8);
   worldGen.lightTest(x, 0, z, 7, 7, 55, 8);
   worldGen.lightTest(x, 0, z, 7, 7, 25, 8);
  }
 }

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunkAsync(x, 0, z);
  }
 }*/

 DVEW.buildFluidMesh();
};

(async () => {
 await DVEW.$INIT({
  voxelPalletMode: "global",
  onReady: start,
  onMessage: (message: string, data: any[]) => {},
 });
})();
