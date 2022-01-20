import { InfoByte } from "../../../../out/Global/Util/InfoByte";
import type { DVEW } from "../../../../out/Meta/World/DVEW";
import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import { LightTest } from "./LightTest.js";
export class WorldGen {
 constructor(public DVEW: DVEW) {
  this.infoByte = this.DVEW.UTIL.getInfoByte();
 }

 lightTest = LightTest;
 infoByte: InfoByte;

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunkX: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:dreamstone:defualt"
  );
  //   this.chunkMap.addChunk(chunkX,chunkZ);
  let liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:liquiddreamether:defualt"
  );

  /**light data
   * light is stored in 4 bits. Levels are stored as 0 - 15;
   *
   */

  const liquidDreamEtherVoxel = [liquidDreamEther, 1, 0xffffffff];

  const returnChunk: any[][][] = [];

  // const dreamStoneVovxel1 = [dreamstone, 1, 0xFFFFFFFF];
  // const dreamStoneVovxel2 = [dreamstone, 1, 0xFF001baF];

  this.infoByte.setNumberValue(0);
  this.infoByte.setHalfByteBits(0, 0);
  this.infoByte.setHalfByteBits(4, 0);
  this.infoByte.setHalfByteBits(8, 0);
  this.infoByte.setHalfByteBits(12, 0);
  const dreamStoneVovxel = [dreamstone, 1, this.infoByte.getNumberValue()];

  let baseY = 0;
  let maxY = 31;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y >= baseY && y <= maxY) {
      returnChunk[x] ??= [];
      returnChunk[x][z] ??= [];
      returnChunk[x][z][y] = [...dreamStoneVovxel];
     }
    }
   }
  }

  this.lightTest(returnChunk, 7, 7, 31, 9);

  return {
   voxels: returnChunk,
   maxMinHeight: [],
   heightMap: [],
  };
 }
}
