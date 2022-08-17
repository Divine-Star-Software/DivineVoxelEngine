import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateChunk(chunkX: number, chunkZ: number) {
  let topY = 31;
  let groundY = 31;
  let maxY = 64;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y < groundY - 1 || (y == 60 && Math.random() > 0.5)) {
      DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, y, z);
     }
     if (y == groundY - 1) {
      DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, x, y, z);
     }
     if (y >= groundY  && y <= maxY) {
      if (x % 7 == 0 && z % 7 == 0) {
       if (y == groundY) {
        DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, y, z);
       } else {
        DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, y, z);
       }
      }
     }
    }
   }
  }
 },
};
