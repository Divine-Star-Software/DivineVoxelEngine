import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";

export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 256,
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let baseY = 10;
  let maxY = 30;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < maxY; y++) {
     const tx = chunkX + x;
     const ty = chunkY + y;
     const tz = chunkZ + z;
     if (y < maxY - 2) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, tx, ty, tz);
     }
     if (y == maxY - 2) {
      DVEW.worldData.paintVoxel("dve:dreamlamp", "default", 0, tx, ty, tz);
     }
    }
   }
  }
 },
};
