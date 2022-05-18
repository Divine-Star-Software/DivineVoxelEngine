import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
import { Flat3DArray } from "../../../../out/Global/Util/Flat3DArray";
export class WorldGen {
 lightSourceColor: number;

 seedLightSourceColor: number;
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 _3dArray: typeof Flat3DArray;
 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
 )  {
  let baseY = 0;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= baseY + 5) {
      this.DVEW.worldData.paintVoxel(
       "dve:lightdebug",
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
