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
  this.lightSourceColor = this.colorFunctions["white"](15, this.infoByte);
  this.seedLightSourceColor = this.colorFunctions["white"](14, this.infoByte);
 }

 visited: Record<string, boolean> = {};

 colorFunctions: Record<
  string,
  (lightLevel: number, infoByte: InfoByte) => number
 > = {
  green: (lightLevel: number, infoByte: InfoByte) => {
   infoByte.setNumberValue(0);
   infoByte.setHalfByteBits(0, 0);
   infoByte.setHalfByteBits(4, 0);
   infoByte.setHalfByteBits(8, lightLevel);
   infoByte.setHalfByteBits(12, 0);
   return infoByte.getNumberValue();
  },
  red: (lightLevel: number, infoByte: InfoByte) => {
   infoByte.setNumberValue(0);
   infoByte.setHalfByteBits(0, 0);
   infoByte.setHalfByteBits(4, lightLevel);
   infoByte.setHalfByteBits(8, 0);
   infoByte.setHalfByteBits(12, 0);
   return infoByte.getNumberValue();
  },
  blue: (lightLevel: number, infoByte: InfoByte) => {
   infoByte.setNumberValue(0);
   infoByte.setHalfByteBits(0, 0);
   infoByte.setHalfByteBits(4, 5);
   infoByte.setHalfByteBits(8, 0);
   infoByte.setHalfByteBits(12, lightLevel);
   return infoByte.getNumberValue();
  },
  white: (lightLevel: number, infoByte: InfoByte) => {
   infoByte.setNumberValue(0);
   infoByte.setHalfByteBits(0, 0);
   infoByte.setHalfByteBits(4, lightLevel);
   infoByte.setHalfByteBits(8, lightLevel);
   infoByte.setHalfByteBits(12, lightLevel);
   return infoByte.getNumberValue();
  },
 };

 infoByte: InfoByte;
 lightByte: LightByte;

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
  let dreamstonepillar =
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstonepillar",
    "default"
   );

  const chunkVoxels: any[][][] = chunk.voxels;

  let baseY = 0;
  let maxY = 61;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= baseY + 5) {
      chunkVoxels[x] ??= [];
      chunkVoxels[x][z] ??= [];
      chunkVoxels[x][z][y] =
       this.DVEW.worldGeneration.paintVoxel(dreamstonepillar);
     }
     /*       if (y >= baseY && y <= maxY + 8 && Math.random() < 0.05) {
      returnChunk[x] ??= [];
      returnChunk[x][z] ??= [];
      returnChunk[x][z][y] = [...dreamStoneVovxel];
     }   */
    }
   }
  }

  return chunk;
 }
}
