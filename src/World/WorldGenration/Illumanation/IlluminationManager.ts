import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";

import {
 RGBFloodFill,
 RGBFloodRemove,
 RunRGBLightUpdate,
} from "./Functions/RGBFloodLight.js";
import { sunLightUpdate } from "./Functions/SunLight.js";

export class IlluminationManager {
 lightByte: LightByte;
 air = [-1, 0];

 sunLightUpdate = sunLightUpdate;
 RGBFloodFill = RGBFloodFill;
 RGBFloodRemove = RGBFloodRemove;
 runRGBLightUpdate = RunRGBLightUpdate;
 _RGBlightUpdateQue: number[][] = [];
 _RGBlightRemovalQue: number[][] = [];
 _sunLightUpdateQue: number[][] = [];

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 populateChunkAirWithInitlSunLight(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ) {
  const heightMap = chunk.heightMap;
  const voxels = chunk.voxels;
  for (const x of heightMap.keys()) {
   for (const z of heightMap.keys()) {
    const y = heightMap[x][z];

    if (voxels[x] && voxels[x][z] && voxels[x][z][y]) {
     const voxel = voxels[x][z][y];
     if (voxel && voxel[0] < 0) {
      const vl = voxel[voxel.length - 1];
      const nl = this.lightByte.getFullSunLight(vl);
      voxel[voxel.length - 1] = nl;
      this._sunLightUpdateQue.push([chunkX + x, chunkY + y, chunkZ + z]);
     }
    }
   }
  }
 }
}
