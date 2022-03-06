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
   const chunk = DVEW.worldGeneration.getBlankChunk(false);
   DVEW.worldGeneration.chunkDataHelper.fillWithAir(chunk);
   worldGen.generateChunk(chunk, x, 0, z);
   DVEW.worldData.setChunk(x, 0, z, chunk);
  }
 }

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunkAsync(x, 0, z);
  }
 }

 DVEW.buildFluidMesh();

 const x = 0;
 const z = 0;
 DVEW.worldData.setData(x, 6, z, DVEW.worldGeneration.paintVoxel(1));
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z);

 DVEW.runChunkRebuildQue();

 DVEW.buildFluidMesh();
};

(async () => {
 await DVEW.$INIT({
  onReady: start,
  onMessage: (message: string, data: any[]) => {},
 });
})();
