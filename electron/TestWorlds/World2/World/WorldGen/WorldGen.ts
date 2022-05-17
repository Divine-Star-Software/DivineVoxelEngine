import { Flat3DArray } from "../../../../out/Global/Util/Flat3DArray";
import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
export class WorldGen {
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 128;

 renderDistance = 20;

 _3dArray: typeof Flat3DArray;

 generateChunk(
  chunkX: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  let debugBox = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:debugbox",
    "default"
   )
  );
  let dreamstone = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstone",
    "default"
   )
  );
  let dreamStonePillar = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstonepillar",
    "default"
   )
  );

  let dreamGrasss = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamgrass",
    "default"
   )
  );

  let liquidDreamEther = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:liquiddreamether",
    "default"
   )
  );
  const chunk = this.DVEW.worldGeneration.getBlankChunk(false);
  const voxels = chunk.voxels;
  if (type == "pillar") {
   let baseY = 31;
   let topY = 50;
   let hole = false;

   for (let x = chunkX; x <= this.chunkWidth + chunkX; x++) {
    for (let z = chunkZ; z <= this.chunkDepth + chunkZ; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y < baseY) {
       this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, y, z);
      }
      if (y == topY) {
       this.DVEW.worldData.paintVoxel(
        "dve:dreamstonepillar",
        "default",
        x,
        y,
        z
       );
      }
      if (y >= baseY && y < topY) {
       if (x % 15 == 0 || z % 15 == 0) {
        if (x > 0) {
         if (x % 2 == 0) continue;
        }
        if (z > 0) {
         if (z % 2 == 0) continue;
        }
        this.DVEW.worldData.paintVoxel(
         "dve:dreamstonepillar",
         "default",
         x,
         y,
         z
        );
       }
      }
     }
    }
   }
  }

  if (type == "default") {
   let topY = 31;
   let groundY = 31;
   let hole = false;
   if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
    topY = 42;
    hole = true;
   }
   for (let x = chunkX; x <= this.chunkWidth + chunkX; x++) {
    for (let z = chunkZ; z <= this.chunkDepth + chunkZ; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (hole) {
       if (y > 30 && y <= topY - 4) {
        if (x > 4 && x < 10) {
         continue;
        }
        if (z > 4 && z < 10) {
         continue;
        }
       }
      }
      if (y < groundY) {
       this.DVEW.worldData.paintVoxel(
        "dve:dreamstonepillar",
        "default",
        x,
        y,
        z
       );
       continue;
      }
      if (hole) {
       if (y < topY) {
        this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, y, z);
       }
      }
     }
    }
   }
   if (!hole) {
    this.DVEW.worldData.paintVoxel(
     "dve:dreamstoneslab",
     "default",
     chunkX + 7,
     topY,
     chunkZ + 7
    );
    this.DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + 7,
     topY,
     chunkZ + 9
    );
   }
  }
  return chunk;
 }
}
