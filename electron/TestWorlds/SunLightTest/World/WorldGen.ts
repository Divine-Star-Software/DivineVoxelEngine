import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = (32 + Math.random() * 5) >> 0;
  let holeMade = false;
  let hole = false;
    let noHole = Math.random() > 0.2;
 // let noHole = true;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    hole = false;
    if (Math.random() > 0.9 && !holeMade && !noHole) {
     hole = true;
     holeMade = true;
    }
    for (let y = 0; y < maxY + 6; y++) {
     if (y >= maxY - 10 && y <= maxY + 6 && hole) {
      continue;
     }
     if (y <= maxY - 15) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
     if (y == maxY - 10) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
     if (y <= maxY - 5 && y >= maxY - 10) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
     if (y == maxY + 5) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
    }
   }
  }
 },
};
