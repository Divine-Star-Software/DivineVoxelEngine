import { DVEW } from "../../../out/index.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures-o.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";

import { WorldGen } from "./WorldGen/WorldGen.js";



RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");

const worldGen = new WorldGen(DVEW);

const rebuild = (x: number, z: number) => {
 DVEW.buildChunkAsync(x, 0, z);
 DVEW.buildChunkAsync(x - 16, 0, z);
 DVEW.buildChunkAsync(x + 16, 0, z);
 DVEW.buildChunkAsync(x + 32, 0, z);
 DVEW.buildChunkAsync(x, 0, z + 16);
 DVEW.buildChunkAsync(x, 0, z - 16);
};

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
 const fullLight = 0b1111_0000_1111_0000;

 const x = 0;
 const z = 0;

 DVEW.worldData.setData(x + 7, 7, z + 7, DVEW.worldGeneration.paintVoxel(1));
 DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x + 7, 0 + 7, z + 7);
 rebuild(x, z);

 setTimeout(() => {
  for (let j = 0; j < 8; j++) {
   for (let i = -5; i < 10; i++) {
    DVEW.worldData.setData(x + 1, 6 + j, z + 4 + i, DVEW.worldGeneration.paintVoxel(2));
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
     false,
     x,
     6 + j,
     z + 4 + i
    );
   }
  }

  for (let j = 0; j < 8; j++) {
   for (let i = -5; i < 10; i++) {
    DVEW.worldData.setData(x + 15, 6 + j, z + 4 + i,DVEW.worldGeneration.paintVoxel(2));
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
     true,
     x + 16,
     6 + j,
     z + 4 + i
    );
   }
  }

  for (let j = 0; j < 8; j++) {
   for (let i = -5; i < 5; i++) {
    DVEW.worldData.setData(x + 7 + i, 6 + j, z - 2, DVEW.worldGeneration.paintVoxel(2));
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
     false,
     x + 7 + i,
     6 + j,
     z - 3
    );
   }
  }

  for (let j = 0; j < 8; j++) {
   for (let i = -5; i < 5; i++) {
    DVEW.worldData.setData(x + 7 + i, 6 + j, z + 14, DVEW.worldGeneration.paintVoxel(2));
    DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
     false,
     x + 7 + i,
     6 + j,
     z + 15
    );
   }
  }

  for (let x = startX; x < endX; x += 20) {
   for (let z = startZ; z < endZ; z += 20) {
    DVEW.buildChunk(x, 0, z);
   }
  }

  DVEW.buildFluidMesh();

  setTimeout(() => {
   for (let j = -1; j < 16; j++) {
    for (let i = -1; i < 16; i++) {
     DVEW.worldData.setData(x + i, 10, z + j,DVEW.worldGeneration.paintVoxel(3));
     DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
      false,
      x + i,
      11,
      z + j
     );
    }
   }
   for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
     DVEW.buildChunk(x, 0, z);
    }
   }
   DVEW.buildFluidMesh();
   setTimeout(() => {
    DVEW.worldData.setAir(x + 7, 10, z + 7,0);
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x + 7, 9, z + 7);
    for (let x = startX; x < endX; x += 16) {
     for (let z = startZ; z < endZ; z += 16) {
      DVEW.buildChunk(x, 0, z);
     }
    }
    DVEW.buildFluidMesh();
   }, 500);
  }, 500);
 }, 500);
};

(async () => {
 await DVEW.$INIT({
  onReady: start,
  
 });
})();
