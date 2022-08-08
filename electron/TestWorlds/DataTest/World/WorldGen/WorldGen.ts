import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateChunk(chunkX: number, chunkZ: number, type: string = "default") {
  if (type == "pillar") {
   let baseY = 31;
   let topY = 50;
   for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
    for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y < baseY) {
       DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, y, z);
      }
      if (y == topY) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
      }
      if (y >= baseY && y < topY) {
       if (
        x == chunkX + 15 ||
        z == chunkZ + 15 ||
        x == chunkX + 1 ||
        z == chunkZ + 1
       ) {
        if (x % 2 == 0) continue;

        if (z % 2 == 0) continue;

        DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
       }
      }
     }
    }
   }
  }

  if (type == "default") {
   let topY = 31;
   let groundY = 31;
   for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
    for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y < groundY) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
       continue;
      }
      let flip = Math.random();
      if (flip >= 0.1) {
          continue;
      }
      if (flip <= 0.01) {
       DVEW.worldData.paintVoxel("dve:dreamstoneslab", 0, 0, x, topY, z);
       continue;
      }
      if (flip >= 0.01 && flip <= 0.02) {
       DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, topY, z);
       let flip2 = Math.random();
       if (flip2 < 0.01) {
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 1, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 2, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 3, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 4, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 4, z + 1);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 4, z - 1);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x + 1, topY + 4, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x - 1, topY + 4, z);
        DVEW.worldData.paintVoxel("dve:dreamgrassblock", 0, 0, x, topY + 5, z);
       }
       continue;
      }
      if (flip >= 0.02 && flip <= 0.03) {
       DVEW.worldData.paintVoxel("dve:dreamgrass", 0, 0, x, topY, z);
       continue;
      }
     }
    }
   }
  }
 },
};
