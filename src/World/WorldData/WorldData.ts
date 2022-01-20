import type { ChunkVoxels, ChunkData } from "Meta/Chunks/Chunk.types";
import {
 GetRelativeVoxelData,
 GetVoxelData,
} from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { ChunkProcessor } from "../Chunks/ChunkProcessor.js";
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { InfoByte } from "Global/Util/InfoByte.js";
import { LightByte } from "Global/Util/LightByte.js";

export class WorldData {
 renderDistance = 20;

 private chunkProccesor: ChunkProcessor;

 chunks: Record<string, ChunkData> = {};
 getVoxelData = GetVoxelData;
 getRelativeVoxelData = GetRelativeVoxelData;
 calculdateVoxelLight = CalculateVoxelLight;
 voxelLightMixCalc = VoxelLightMixCalc;

 infoByte: InfoByte;
 lightByte: LightByte;

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.infoByte = this.DVEW.UTIL.getInfoByte();
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 getCurrentWorldDataSize() {
  const data = JSON.stringify(this.chunks);
  return new Blob([data]).size;
 }
 getCurrentWorldDataString() {
  return JSON.stringify(this.chunks);
 }

 getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false {
  if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) {
   return false;
  }
  return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 removeChunk(chunkX: number, chunkY: number, chunkZ: number) {}

 setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData) {
  this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk;
 }

 getChunkPosition(x: number, y: number, z: number) {
  return [(x >> 4) << 4, (y >> 7) << 7, (z >> 4) << 4];
 }

 requestVoxelAdd(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number,
  voxelPalletId: number = 1
 ): false | ChunkVoxels {
     console.log(arguments);
  const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
  const relativePOS = this._getRelativeChunkPosition(
   chunkX,
   chunkY,
   chunkZ,
   x,
   y,
   z
  );
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];
  const relativeY = relativePOS[2];
  const chunkVoxels = chunk.voxels;
  let pallet = chunk.voxelPallet;
  if (!pallet) {
   pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
  }
  if (!chunkVoxels[relativeX][relativeZ]) {
   chunkVoxels[relativeX][relativeZ] ??= [];
   chunkVoxels[relativeX][relativeZ][relativeY] = [
    voxelPalletId,
    1,
    0xffffffff,
   ];

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    chunkX,
    chunkY,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );
  } else if (!chunkVoxels[relativeX][relativeZ][y]) {
   chunkVoxels[relativeX][relativeZ][y] = [voxelPalletId, 0, 0];
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    chunkX,
    chunkY,
    chunkZ
   );

   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );
  }

  return false;
 }

 _checkNearbyChunksToRebuild(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  relativeX: number,
  relativeZ: number
 ) {
  let updated = false;
  buildChunkX0: if (relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15: if (relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkZ0: if (relativeZ == 0) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkZ0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkZ15: if (relativeZ == 15) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkZ15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z15: if (relativeZ == 15 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15Z15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z0: if (relativeZ == 0 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0Z0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z0: if (relativeZ == 0 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ - 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX15Z0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z15: if (relativeZ == 15 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ + 16;
   const newChunkY = chunkY;
   const chunk = this.getChunk(newChunkX, newChunkY, newChunkZ);
   if (!chunk) break buildChunkX0Z15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    newChunkX,
    newChunkY,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkY,
    newChunkZ,
    template
   );
  }
  if (updated) {
   this.DVEW.buildFluidMesh();
  }
 }

 _getRelativeChunkPosition(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  let relativeX = Math.abs(x - chunkX);
  if (x < 0) {
   if (x == chunkX + 15) {
    relativeX = 15;
   }
  }
  let relativeZ = Math.abs(z - chunkZ);
  if (z < 0) {
   if (z == chunkZ + 15) {
    relativeZ = 15;
   }
  }
  let realtiveY = Math.abs(y - chunkY);
  if (y < 0) {
   if (y == chunkY + 127) {
    y = 127;
   }
  }

  return [relativeX, relativeZ, realtiveY];
 }

 requestVoxelBeRemove(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number,
  blockId: number = 1
 ): false | ChunkVoxels {
  const chunk = this.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;

  const relativePOS = this._getRelativeChunkPosition(
   chunkX,
   chunkY,
   chunkZ,
   x,
   y,
   z
  );
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];
  const relativeY = relativePOS[2];
  const chunkVoxels = chunk.voxels;
  let pallet = chunk.voxelPallet;
  if (!pallet) {
   pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
  }

  if (!chunkVoxels[relativeX]) return false;
  if (!chunkVoxels[relativeX][relativeZ]) return false;
  if (chunkVoxels[relativeX][relativeZ][relativeY]) {
   delete chunkVoxels[relativeX][relativeZ][relativeY];

   this._checkNearbyChunksToRebuild(
    chunkX,
    chunkY,
    chunkZ,
    relativeX,
    relativeZ
   );

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk,
    pallet,
    chunkX,
    chunkY,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    chunkX,
    chunkY,
    chunkZ,
    template
   );

   this.DVEW.buildFluidMesh();

   return chunkVoxels;
  } else {
   return false;
  }
 }
}
