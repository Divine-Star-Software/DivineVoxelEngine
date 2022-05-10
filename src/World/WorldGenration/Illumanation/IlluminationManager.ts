import { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { ChunkBound } from "Meta/World/ChunkBound.interface.js";
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
import type { VoxelByte } from "Global/Util/VoxelByte.js";

export class IlluminationManager implements ChunkBound {
 lightByte: typeof LightByte;
 voxelByte: typeof VoxelByte;
 _3dArray: typeof Flat3DArray;
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
  this.voxelByte = this.DVEW.UTIL.getVoxelByte();
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 syncChunkBounds(): void {
  this.DVEW.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
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
    const voxel = this._3dArray.getValue(x, y, z, voxels);
    const voxelId = this.voxelByte.getId(voxel);
    if (voxelId == 0) {
     const nl = this.lightByte.getFullSunLight(voxel);
     const newVoxel = this.voxelByte.encodeLightIntoVoxelData(voxel, nl);
     this._3dArray.setValue(x, y, z, voxels, newVoxel);
    }
   }
  }
 }
}
