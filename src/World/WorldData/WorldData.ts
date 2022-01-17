import type { ChunkVoxels, ChunkData } from "Meta/WorldData/World.types.js";
import { GetRealtiveVoxelData } from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { ChunkProcessor } from "../Chunks/ChunkProcessor.js";

export class WorldData {
 renderDistance = 20;

 private chunkProccesor: ChunkProcessor;

 chunks: Record<number, Record<number, ChunkData>> = {};
 getRealtiveVoxelData = GetRealtiveVoxelData;
 constructor(private DVEW: DivineVoxelEngineWorld) {}

 getCurrentWorldDataSize() {
  const data = JSON.stringify(this.chunks);
  return new Blob([data]).size;
 }
 getCurrentWorldDataString() {
  return JSON.stringify(this.chunks);
 }



 getChunk(chunkX: number, chunkZ: number): ChunkData | false {
  if (!this.chunks[chunkX]) {
   return false;
  } else if (!this.chunks[chunkX][chunkZ]) {
   return false;
  } else {
   return this.chunks[chunkX][chunkZ];
  }
 }

 removeChunk(chunkX: number, chunkZ: number) {}

 setChunk(chunkX: number, chunkZ: number, chunk: ChunkData) {
  this.chunks[chunkX] ??= {};
  this.chunks[chunkX][chunkZ] = chunk;
 }

 requestVoxelAdd(
  chunkX: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number,
  voxelPalletId: number = 1
 ): false | ChunkVoxels {
  const chunk = this.chunks[chunkX][chunkZ];
  const relativePOS = this._getRelativeChunkPosition(chunkX, chunkZ, x, y, z);
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];

  const chunkVoxels = chunk.voxels;
  let pallet = chunk.voxelPallet;
  if (!pallet) {
   pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
  }
  if (!chunkVoxels[relativeX][relativeZ]) {
   chunkVoxels[relativeX][relativeZ] ??= [];
   chunkVoxels[relativeX][relativeZ][y] = [voxelPalletId, 1, 1];

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunkVoxels,
    pallet,
    chunkX,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(chunkX, chunkZ, template);

   this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
  } else if (!chunkVoxels[relativeX][relativeZ][y]) {
   chunkVoxels[relativeX][relativeZ][y] = [voxelPalletId, 0, 0];
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunkVoxels,
    pallet,
    chunkX,
    chunkZ
   );

   this.DVEW.builderManager.requestFullChunkBeBuilt(chunkX, chunkZ, template);

   this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
  }

  return false;
 }

 _checkNearbyChunksToRebuild(
  chunkX: number,
  chunkZ: number,
  relativeX: number,
  relativeZ: number
 ) {
  let updated = false;
  buildChunkX0: if (relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkX15: if (relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkZ0: if (relativeZ == 0) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ - 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkZ0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkZ15: if (relativeZ == 15) {
   const newChunkX = chunkX;
   const newChunkZ = chunkZ + 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkZ15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z15: if (relativeZ == 15 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ + 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX15Z15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z0: if (relativeZ == 0 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ - 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX0Z0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkX15Z0: if (relativeZ == 0 && relativeX == 15) {
   const newChunkX = chunkX + 16;
   const newChunkZ = chunkZ - 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX15Z0;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
    newChunkZ,
    template
   );
  }
  buildChunkX0Z15: if (relativeZ == 15 && relativeX == 0) {
   const newChunkX = chunkX - 16;
   const newChunkZ = chunkZ + 16;
   const chunk = this.getChunk(newChunkX, newChunkZ);
   if (!chunk) break buildChunkX0Z15;
   let pallet = chunk.voxelPallet;
   if (!pallet) {
    pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
   }
   updated = true;
   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunk.voxels,
    pallet,
    newChunkX,
    newChunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(
    newChunkX,
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
  if (z > 0) {
   if (z == chunkZ - 15) {
    relativeZ = 15;
   }
  }

  return [relativeX, relativeZ];
 }

 requestBlockRemove(
  chunkX: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number,
  blockId: number = 1
 ): false | ChunkVoxels {
  const chunk = this.chunks[chunkX][chunkZ];

  const relativePOS = this._getRelativeChunkPosition(chunkX, chunkZ, x, y, z);
  const relativeX = relativePOS[0];
  const relativeZ = relativePOS[1];

  const chunkVoxels = chunk.voxels;
  let pallet = chunk.voxelPallet;
  if (!pallet) {
   pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
  }

  if (!chunkVoxels[relativeX]) return false;
  if (!chunkVoxels[relativeX][relativeZ]) return false;
  if (chunkVoxels[relativeX][relativeZ][y]) {
   delete chunkVoxels[relativeX][relativeZ][y];

   this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);

   const template = this.DVEW.chunkProccesor.makeAllChunkTemplates(
    chunkVoxels,
    pallet,
    chunkX,
    chunkZ
   );
   this.DVEW.builderManager.requestFullChunkBeBuilt(chunkX, chunkZ, template);

   this.DVEW.buildFluidMesh();

   return chunkVoxels;
  } else {
   return false;
  }
 }
}
