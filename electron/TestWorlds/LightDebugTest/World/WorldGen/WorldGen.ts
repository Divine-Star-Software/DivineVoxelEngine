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

 generateChunk(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  let lightDebugBox = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
   "dve:lightdebug","default"
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
      chunkVoxels[x][z][y] = this.DVEW.worldGeneration.paintVoxel(lightDebugBox);
     }
    }
   }
  }

  return chunk;
 }
}
