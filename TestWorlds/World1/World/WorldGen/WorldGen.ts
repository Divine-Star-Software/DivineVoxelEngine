import type { DVEW } from "../../../../out/Meta/World/DVEW";
import type { ChunkData } from "../../../../out/Meta/WorldData/World.types";
export class WorldGen {
 constructor(public DVEW: DVEW) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(chunkX: number, chunkZ: number): ChunkData {
  //   this.chunkMap.addChunk(chunkX,chunkZ);

  const returnChunk: any[][][] = [];

  let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:dreamstone:defualt"
  );
  let dreamStonePillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:dreamstonepillar:defualt"
  );
  let dreamGrass = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:dreamgrassblock:defualt"
  );
  let debugBox = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
   "dve:debugbox:defualt"
  );

  // debugBox = dreamstone;
  let block = [dreamGrass,0];

  let toss = Math.random();
  let spiked = false;
  let crazy = false;
  let hole = false;
  if (toss < 0.2) {
   crazy = true;
   block = [dreamstone,1,1]; 
  }
  if (toss > 0.2 && toss < 0.4) {
   spiked = true;
   block = [dreamStonePillar,1,1];
  }
  if (toss > 0.4 && toss < 0.6) {
   hole = true;
   block = [dreamstone,1,1]; 
  }
  let normal = true;
  if (crazy || spiked || hole) {
   normal = false;
  }

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (crazy) {
      if (y < Math.floor(Math.random() * 30)) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
     }
     if (spiked) {
      if (x == 7 && z == 7) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
      if (x == 7 && z == 8) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
      if (x == 8 && z == 8) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
      if (x == 8 && z == 7) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
      if (x == 0 || z == 0 || x == 15 || z == 15) {
       if (y == 30) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 1 || z == 1 || x == 14 || z == 14) {
       if (y == 31) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 2 || z == 2 || x == 13 || z == 13) {
       if (y == 32) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 3 || z == 3 || x == 12 || z == 12) {
       if (y == 33) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 4 || z == 4 || x == 11 || z == 11) {
       if (y == 33) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 5 || z == 5 || x == 10 || z == 10) {
       if (y == 34) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 6 || z == 6 || x == 9 || z == 9) {
       if (y == 35) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }

      if (y < 30) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
     }

     if (hole) {
      if (x == 0 || z == 0 || x == 15 || z == 15) {
       if (y == 30) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 1 || z == 1 || x == 14 || z == 14) {
       if (y == 29) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 2 || z == 2 || x == 13 || z == 13) {
       if (y == 28) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 3 || z == 3 || x == 12 || z == 12) {
       if (y == 27) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 4 || z == 4 || x == 11 || z == 11) {
       if (y == 26) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 5 || z == 5 || x == 10 || z == 10) {
       if (y == 25) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }
      if (x == 6 || z == 6 || x == 9 || z == 9) {
       if (y == 24) {
        returnChunk[x] ??= [];
        returnChunk[x][z] ??= [];
        returnChunk[x][z][y] = block;
       }
      }

      if (y < 23) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
     }

     if (normal) {
      if (y < 30) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = block;
      }
      if (x == 8 && z == 8 && y == 32) {
       returnChunk[x] ??= [];
       returnChunk[x][z] ??= [];
       returnChunk[x][z][y] = [debugBox,1,1];
      }
     }
    }
   }
  }

  return {
   voxels: returnChunk,
  };
 }

 generateChunkLine(
  chunkX: number,
  chunkZ: number,
  direction: "north" | "east" | "south" | "west"
 ) {
  const chunks = this.DVEW.worldData.chunks;
  if (direction == "north") {
   const newChunkZ = chunkZ + (this.renderDistance / 2) * 16 + 16;
   const removeChunkZ = chunkZ - (this.renderDistance / 2) * 16 + 32;
   const previousMaxChunkRebuild = newChunkZ - 32;

   for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
    if (!chunks[i]) {
     chunks[i] = [];
    }

    if (!chunks[i][previousMaxChunkRebuild]) {
     const newChunk = this.generateChunk(i, previousMaxChunkRebuild);
     this.DVEW.worldData.setChunk(i, previousMaxChunkRebuild, newChunk);
     this.DVEW.buildChunk(i, previousMaxChunkRebuild);
    }
   }
   for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
    if (!chunks[i]) {
     chunks[i] = [];
    }
    if (chunks[i][removeChunkZ]) {
     this.DVEW.removeChunk(i, removeChunkZ);
    }
    if (!chunks[i][newChunkZ]) {
     const newChunk = this.generateChunk(i, newChunkZ);
     this.DVEW.worldData.setChunk(i, newChunkZ, newChunk);
     this.DVEW.buildChunk(i, newChunkZ);
    }
   }
  }
  if (direction == "south") {
   const removeChunkZ = chunkZ + (this.renderDistance / 2) * 16;
   const newChunkZ = chunkZ - (this.renderDistance / 2) * 16;

   for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
    if (!chunks[i]) {
     chunks[i] = [];
    }
    if (chunks[i][removeChunkZ]) {
     this.DVEW.removeChunk(i, removeChunkZ);
    }
    if (!chunks[i][newChunkZ]) {
     const newChunk = this.generateChunk(i, newChunkZ);
     this.DVEW.worldData.setChunk(i, newChunkZ, newChunk);
     this.DVEW.buildChunk(i, newChunkZ);
    }
   }
  }

  if (direction == "east") {
   const newChunkX = chunkX + (this.renderDistance / 2) * 16 + 16;
   const removeChunkX = chunkX - (this.renderDistance / 2) * 16 + 16;
   const previousMaxChunkRebuild = newChunkX - 16;

   for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
    if (!chunks[newChunkX]) {
     chunks[newChunkX] = [];
    }

    if (!chunks[newChunkX][i]) {
     const newChunk = this.generateChunk(newChunkX, i);
     this.DVEW.worldData.setChunk(newChunkX, i, newChunk);
     this.DVEW.buildChunk(newChunkX, i);
    }
   }
   for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
    if (!chunks[previousMaxChunkRebuild]) {
     chunks[previousMaxChunkRebuild] = [];
    }

    if (!chunks[previousMaxChunkRebuild][i]) {
     const newChunk = this.generateChunk(previousMaxChunkRebuild, i);
     this.DVEW.worldData.setChunk(previousMaxChunkRebuild, i, newChunk);
     this.DVEW.buildChunk(previousMaxChunkRebuild, i);
    }
   }

   for (const checkChunkX of Object.keys(chunks)) {
    const chunkXNum = Number(checkChunkX);
    if (chunkXNum <= removeChunkX) {
     for (const chunk of Object.keys(chunks[chunkXNum])) {
      const chunkZ = Number(chunk);
      chunks[chunkXNum][chunkZ];
      this.DVEW.builderManager.requestChunkBeRemoved(chunkXNum, chunkZ);

      delete chunks[chunkXNum][chunkZ];
     }
     delete chunks[chunkXNum];
    }
   }

   delete chunks[removeChunkX];
  }

  if (direction == "west") {
   const removeChunkX = chunkX + (this.renderDistance / 2) * 16;
   const newChunkX = chunkX - (this.renderDistance / 2) * 16;
   const previousMaxChunkRebuild = newChunkX + 16;

   for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
    if (!chunks[newChunkX]) {
     chunks[newChunkX] = [];
    }

    if (!chunks[newChunkX][i]) {
     const newChunk = this.generateChunk(newChunkX, i);
     this.DVEW.worldData.setChunk(newChunkX, i, newChunk);
     this.DVEW.buildChunk(newChunkX, i);
    }
   }
   for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
    if (!chunks[previousMaxChunkRebuild]) {
     chunks[previousMaxChunkRebuild] = [];
    }

    if (!chunks[previousMaxChunkRebuild][i]) {
     const newChunk = this.generateChunk(newChunkX, i);
     this.DVEW.worldData.setChunk(previousMaxChunkRebuild, i, newChunk);
     this.DVEW.buildChunk(previousMaxChunkRebuild, i);
    }
   }
   for (const checkChunkX of Object.keys(chunks)) {
    const chunkXNum = Number(checkChunkX);
    if (chunkXNum >= removeChunkX) {
     for (const chunk of Object.keys(chunks[chunkXNum])) {
      const chunkZ = Number(chunk);
      chunks[chunkXNum][chunkZ];
      this.DVEW.builderManager.requestChunkBeRemoved(chunkXNum, chunkZ);

      delete chunks[chunkXNum][chunkZ];
     }
     delete chunks[chunkXNum];
    }
   }

   delete chunks[removeChunkX];
  }
 }
}
