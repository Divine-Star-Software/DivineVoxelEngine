import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
export class WorldGen {
 constructor(public DVEW: DivineVoxelEngineWorld) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunkX: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  let dreamstone = this.DVEW.worldGeneration.getVoxelPaletteIdFromGlobalPalette(
   "dve:dreamstone","default"
  );
  //   this.chunkMap.addChunk(chunkX,chunkZ);
  let liquidDreamEther = this.DVEW.worldGeneration.getVoxelPaletteIdFromGlobalPalette(
   "dve:liquiddreamether","default"
  );
  const liquidDreamEtherVoxel = [liquidDreamEther, 1, 1];
  const returnChunk: any[][][] = [];
  const dreamStoneVovxel = [dreamstone, 1, 1];

  let baseY = 0;
  let maxY = 31;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y > baseY && y <= maxY) {
      returnChunk[x] ??= [];
      returnChunk[x][z] ??= [];
      returnChunk[x][z][y] = liquidDreamEtherVoxel;
     }
     if (y == baseY) {
      returnChunk[x] ??= [];
      returnChunk[x][z] ??= [];
      returnChunk[x][z][y] = dreamStoneVovxel;
     }
    }
   }
  }

  return {
   voxels: returnChunk,
   isEmpty : false,
   maxMinHeight: [],
   heightMap: [],
  };
 }
}
