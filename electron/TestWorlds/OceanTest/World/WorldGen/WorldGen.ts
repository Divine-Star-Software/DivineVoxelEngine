import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
export class WorldGen {
 constructor(public DVEW: DivineVoxelEngineWorld) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;
 generateChunk(chunkX: number, chunkZ: number) {
  let baseY = 0;
  let maxY = 31;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y > baseY && y <= maxY) {
      this.DVEW.worldData.paintVoxel(
       "dve:liquiddreamether",
       "default",
       x + chunkX,
       y,
       z + chunkZ
      );
     }
     if (y == baseY) {
      this.DVEW.worldData.paintVoxel(
       "dve:dreamstone",
       "default",
       x + chunkX,
       y,
       z + chunkZ
      );
     }
    }
   }
  }
 }
}
