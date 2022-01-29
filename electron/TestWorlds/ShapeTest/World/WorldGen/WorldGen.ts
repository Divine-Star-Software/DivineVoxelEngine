import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
export class WorldGen {
 constructor(public DVEW: DivineVoxelEngineWorld) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

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

  const returnChunk: any[][][] = [];
  if (type == "fluid") {
   let baseY = 0;
   let maxY = 31;

   for (let x = 0; x < +this.chunkWidth; x++) {
    for (let z = 0; z < this.chunkDepth; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y > baseY && y <= maxY) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = liquidDreamEther;
      }
      if (y == baseY) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }
     }
    }
   }
  }

  if (type == "pond") {
   let baseY = 31;
   let topY = 50;
   let hole = false;

   for (let x = 0; x < +this.chunkWidth; x++) {
    for (let z = 0; z < this.chunkDepth; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y < baseY) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
       continue;
      }
      if (y == baseY && x > 0 && x < 15 && z > 0 && z < 15) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = liquidDreamEther;
      }
      if (y == baseY && x == 0) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }

      if (y == baseY && x == 15) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }
      if (y == baseY && z == 0) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }
      if (y == baseY && z == 15) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }
     }
    }
   }
  }

  if (type == "pillar") {
   let baseY = 31;
   let topY = 50;
   let hole = false;

   for (let x = 0; x < +this.chunkWidth; x++) {
    for (let z = 0; z < this.chunkDepth; z++) {
     for (let y = 0; y < this.chunkHeight; y++) {
      if (y < baseY) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamstone;
      }
      if (y == topY) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamStonePillar;
      }
      if (y >= baseY && y < topY) {
       if (x % 15 == 0 || z % 15 == 0) {
        if (x > 0) {
         if (x % 2 == 0) continue;
        }
        if (z > 0) {
         if (z % 2 == 0) continue;
        }

        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = dreamStonePillar;
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
   for (let x = 0; x < +this.chunkWidth; x++) {
    for (let z = 0; z < this.chunkDepth; z++) {
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
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = dreamStonePillar;
       continue;
      }
      if (hole) {
       if (y < topY) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = dreamstone;
       }
      }
     }
    }
   }
   returnChunk[3][3][topY] = liquidDreamEther;
   returnChunk[5][5][topY] = dreamGrasss;
   returnChunk[7][7][topY] = debugBox;
   returnChunk[7][7][topY + 1] = debugBox;
   returnChunk[7][7][topY + 2] = debugBox;
   returnChunk[7][7][topY + 3] = debugBox;
   returnChunk[0][0][topY] = debugBox;
   returnChunk[0][15][topY] = debugBox;
   returnChunk[15][15][topY] = debugBox;
   returnChunk[15][0][topY] = debugBox;
  }
  return {
   voxels: returnChunk,
   maxMinHeight: [],
   isEmpty: false,
   heightMap: [],
  };
 }
}
