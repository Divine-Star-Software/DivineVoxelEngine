import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";

import {
 runRGBFloodFillAt,
 runRGBFloodRemove,
 runRGBFloodRemoveAt,
 runRGBFloodFill,
} from "./Functions/RGBFloodLight.js";
import {
 runSunLightRemove,
 runSunLightRemoveAt,
 runSunLightUpdate,
 runSunLightUpdateAt,
} from "./Functions/SunLight.js";

export class IlluminationManager {
 lightByte: LightByte;
 air = [-1, 0];
 runSunLightUpdateAt = runSunLightUpdateAt;
 runSunLightUpdate = runSunLightUpdate;
 runSunLightRemove = runSunLightRemove;
 runSunLightRemoveAt = runSunLightRemoveAt;
 runRGBFloodFillAt = runRGBFloodFillAt;
 runRGBFloodFill = runRGBFloodFill;
 runRGBFloodRemoveAt = runRGBFloodRemoveAt;
 runRGBFloodRemove = runRGBFloodRemove;
 _RGBlightUpdateQue: number[][] = [];
 _RGBlightRemovalQue: number[][] = [];
 _sunLightUpdateQue: number[][] = [];
 _sunLightRemoveQue: number[][] = [];

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 addChunkToSunLightUpdate(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  const heightMap = chunk.heightMap;
  const voxels = chunk.voxels;
  for (let x = 0; x < 16; x++) {
   for (let z = 0; z < 16; z++) {
    this._sunLightUpdateQue.push([
     chunkX + x - 1,
     chunkY + 127,
     chunkZ + z - 1,
    ]);
    this._sunLightUpdateQue.push([chunkX + x, chunkY + 127, chunkZ + z]);
   }
  }
 }

 populateChunkAirWithInitlSunLight(chunk: ChunkData) {
  const heightMap = chunk.heightMap;
  const voxels = chunk.voxels;
  for (let x = 0; x < 16; x++) {
   for (let z = 0; z < 16; z++) {
    const y = heightMap[x][z];
    if (voxels[x] && voxels[x][z] && voxels[x][z][y]) {
     const voxel = voxels[x][z][y];
     if (voxel && voxel[0] < 0) {
      const vl = voxel[voxel.length - 1];
      const nl = this.lightByte.getFullSunLight(vl);
      voxel[voxel.length - 1] = nl;
     }
    }
   }
  }
 }
}
