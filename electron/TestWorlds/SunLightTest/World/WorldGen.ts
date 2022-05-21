import type { ChunkData } from "../../../out/Meta/Chunks/Chunk.types";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 _3dArray: DVEW.UTIL.getFlat3DArray(),

 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 256,

 generateChunk(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  const dreamstonepillar =
   DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstonepillar",
    "default"
   );
  const chunkVoxels = chunk.voxels;
  let maxY = 126;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= maxY / 2 - 5) {
      this._3dArray.setValue(
       x,
       y,
       z,
       chunkVoxels,
       DVEW.worldGeneration.paintVoxel(dreamstonepillar)
      );
     }
     if (y == maxY / 2) {
      this._3dArray.setValue(
       x,
       y,
       z,
       chunkVoxels,
       DVEW.worldGeneration.paintVoxel(dreamstonepillar)
      );
     }
    }
   }
  }
  if (Math.random() > 0.5) {
   this._3dArray.setValue(7, maxY / 2, 7, chunkVoxels, 0);
  }
  return chunk;
 },
};
