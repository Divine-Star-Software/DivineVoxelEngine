import { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";

export class ChunkDataHelper {
 lightByte: LightByte;
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 fillWithAir(chunk: ChunkData) {
  const voxels = chunk.voxels;
  for (let x = 0; x < 16; x++) {
   for (let z = 0; z < 16; z++) {
    for (let y = 0; y < 128; y++) {
     voxels[x] ??= [];
     voxels[x][z] ??= [];
     voxels[x][z][y] = [...[-1, 0b0000]];
    }
   }
  }
 }

 createHeightMap(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  const voxels = chunk.voxels;
  const heightMap: number[][] = [];
  for (const x of voxels.keys()) {
   heightMap[x] = [];
   for (const z of voxels.keys()) {
    heightMap[x][z] = chunkY + 127;
   }
  }
  chunk.heightMap = heightMap;
 }
}
