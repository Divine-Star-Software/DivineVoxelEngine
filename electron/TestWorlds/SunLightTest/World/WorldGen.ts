import { InfoByte } from "../../../out/Global/Util/InfoByte";
import type { ChunkData } from "../../../out/Meta/Chunks/Chunk.types";

import type { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld";
import { LightByte } from "../../../out/Global/Util/LightByte";
import { Flat3DArray } from "../../../out/Global/Util/Flat3DArray";
export class WorldGen {

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 visited: Record<string, boolean> = {};


 _3dArray : typeof Flat3DArray;

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  const dreamstonepillar =
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstonepillar",
    "default"
   );

  const chunkVoxels = chunk.voxels;
  let baseY = 0;
  let maxY = 126;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= maxY / 2 - 5) {
      this._3dArray.setValue(x,y,z,chunkVoxels, this.DVEW.worldGeneration.paintVoxel(dreamstonepillar));
     }

     if (y == maxY / 2) {
     this._3dArray.setValue(x,y,z,chunkVoxels, this.DVEW.worldGeneration.paintVoxel(dreamstonepillar));
     }
    }
   }
  }

  if (Math.random() > 0.5) {

   this._3dArray.setValue(7,maxY / 2,7,chunkVoxels, 0);
  }

  return chunk;
 }
}
