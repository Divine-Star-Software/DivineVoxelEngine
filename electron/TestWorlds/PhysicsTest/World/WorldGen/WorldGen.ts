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
     if (y <= baseY + 5) {
      DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
     if (y > baseY + 5 && y <= baseY + 7 && z == 0 && x == 0) {
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