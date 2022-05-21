import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 10,
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let baseY = 0;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= baseY + 5) {
      DVEW.worldData.paintVoxel(
       "dve:liquiddreamether",
       "default",
       chunkX + x,
       chunkY + y,
       chunkZ + z
      );
     }
    }
   }
  }
 },
};
