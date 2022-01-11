import type { DVEW } from "../../../../dist/Meta/Contents/World/DVEW";
export class WorldGen {
 constructor(public DVEW: DVEW) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(chunkX: number, chunkZ: number): any[][][] {
  //   this.chunkMap.addChunk(chunkX,chunkZ);

  const returnChunk: any[][][] = [];

  let block = ["dve:voxel1", 0, ""];
  let startingY = 31;
  let hole = false;
  if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
   startingY = 42;
   hole = true;
  }

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (hole) {
      if (y > 30 && y <= startingY - 4) {
       if (x > 4 && x < 10) {
        continue;
       }
       if (z > 4 && z < 10) {
        continue;
       }
      }
     }

     if (y < startingY) {
      returnChunk[x] ??= [];
      returnChunk[x][z] ??= [];
      returnChunk[x][z][y] = block;
     }
    }
   }
  }

  returnChunk[7][7][startingY] = ["dve:debugbox", 0, ""];
  returnChunk[7][7][startingY + 1] = ["dve:debugbox", 0, ""];
  returnChunk[7][7][startingY + 2] = ["dve:debugbox", 0, ""];
  returnChunk[7][7][startingY + 3] = ["dve:debugbox", 0, ""];
  returnChunk[0][0][startingY] = ["dve:voxel1", 0, ""];
  returnChunk[0][15][startingY] = ["dve:voxel1", 0, ""];
  returnChunk[15][15][startingY] = ["dve:voxel1", 0, ""];
  returnChunk[15][0][startingY] = ["dve:voxel1", 0, ""];
  return returnChunk;
 }
}
