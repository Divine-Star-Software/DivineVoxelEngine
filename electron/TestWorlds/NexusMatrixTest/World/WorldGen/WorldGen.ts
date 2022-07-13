import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";

export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = 10;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    let currentY = maxY;

    let minus = Math.random() > 0.5;
    if (minus) {
     currentY -= Math.random() * 2;
    } else {
     currentY += Math.random() * 2;
    }
    currentY = currentY >> 0;
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y < currentY) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default", 0,
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }

     if (Math.random() < 0.01 && y == currentY) {
      DVEW.worldData.paintVoxel(
       "dve:dreamlamp",
       "default", 0,
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
