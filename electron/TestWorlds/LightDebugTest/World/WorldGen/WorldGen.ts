import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 _3dArray: DVEW.UTIL.getFlat3DArray(),
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 256,
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let baseY = 0;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (x == 7 && z == 7 && y == baseY + 10) {
      continue;
     }
     if (x == 7 && y <= baseY + 15 && z != 7)  {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default", 0,
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
     if (x == 8 && y <= baseY + 15 && z == 10)  {
        DVEW.worldData.paintVoxel(
         "dve:dreamstonepillar",
         "default", 0,
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
       }
     if (y <= baseY + 3 || y == baseY + 10) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default", 0,
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
      /*       DVEW.worldData.paintVoxel(
       "dve:dreamstone",
       "default", 0,
       x + chunkX,
       y + chunkY,
       z + chunkZ
      ); */
     }
     if (y == baseY + 6) {
      /*       DVEW.worldData.paintVoxel(
       "dve:dreamgrass",
       "default", 0,
       x + chunkX,
       y + chunkY,
       z + chunkZ
      ); */
     }
    }
   }
  }
 },
};
