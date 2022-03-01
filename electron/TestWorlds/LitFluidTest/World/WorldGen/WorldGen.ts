import { InfoByte } from "../../../../out/Global/Util/InfoByte";

import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";

import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
import { LightByte } from "../../../../out/Global/Util/LightByte";
import { Flat3DArray } from "../../../../out/Global/Util/Flat3DArray";
export class WorldGen {
 lightSourceColor: number;

 seedLightSourceColor: number;
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 infoByte: InfoByte;
 lightByte: LightByte;
 _3dArray: Flat3DArray;
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
  let liquiddreamether =
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:liquiddreamether",
    "default"
   );

  const chunkVoxels: number[] = chunk.voxels;

  let baseY = 0;
  let maxY = 61;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= baseY + 5) {
      this._3dArray.setValue(
       x,
       y,
       z,
       chunkVoxels,
       this.DVEW.worldGeneration.paintVoxel(liquiddreamether)
      );
     }
    }
   }
  }

  return chunk;
 }
}
