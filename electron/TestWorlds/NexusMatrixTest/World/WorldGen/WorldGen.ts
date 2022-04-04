import { InfoByte } from "../../../../out/Global/Util/InfoByte";

import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";

import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
import { LightByte } from "../../../../out/Global/Util/LightByte";
export class WorldGen {
 lightSourceColor: number;
 seedLightSourceColor: number;
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 infoByte: InfoByte;
 lightByte: LightByte;

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = 10;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= maxY) {
      this.DVEW.worldData.paintVoxel(
       "dve:dreamstonepillar",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }

     if (x == 7 && z == 7 && y == maxY) {
      this.DVEW.worldData.paintVoxel(
       "dve:debugbox",
       "default",
       x + chunkX,
       y + chunkY,
       z + chunkZ
      );
     }
    }
   }
  }
 }
}
