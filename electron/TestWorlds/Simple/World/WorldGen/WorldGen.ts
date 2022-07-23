import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateTree(x: number, y: number, z: number) {
  DVEW.worldData.paintVoxel("dve:dream-log", "default", 0, x, y + 1, z);
  DVEW.worldData.paintVoxel("dve:dream-log", "default", 0, x, y + 2, z);
  DVEW.worldData.paintVoxel("dve:dream-log", "default", 0, x, y + 3, z);
  DVEW.worldData.paintVoxel("dve:dream-log", "default", 0, x, y + 4, z);

  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 4, z + 1);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 4, z - 1);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x + 1, y + 4, z);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x - 1, y + 4, z);

  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x + 1,
   y + 4,
   z + 1
  );
  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x + 1,
   y + 4,
   z - 1
  );

  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x + 1,
   y + 4,
   z + 1
  );
  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x + 1,
   y + 4,
   z - 1
  );
  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x - 1,
   y + 4,
   z + 1
  );
  DVEW.worldData.paintVoxel(
   "dve:dream-leafs",
   "default",
   0,
   x - 1,
   y + 4,
   z - 1
  );

  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 5, z + 1);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 5, z - 1);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x + 1, y + 5, z);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x - 1, y + 5, z);

  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 5, z);

  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 4, z + 2);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 4, z - 2);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x + 2, y + 4, z);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x - 2, y + 4, z);
  DVEW.worldData.paintVoxel("dve:dream-leafs", "default", 0, x, y + 6, z);
 },

 generateStairChunk(chunkX: number, chunkZ: number) {
  let baseY = 31;
  let yAdd = 0;
  for (let z = chunkZ - 1 + this.chunkDepth; z > chunkZ; z--) {
   yAdd++;
   for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y == 55 && z == chunkZ - 1) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      continue;
     }
     if (y == baseY + yAdd) {
      if (x == chunkX || x == chunkX + 15) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      }
      if (x > chunkX && x < chunkX + 15) {
       DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, x, y, z);
      }
     }
    }
   }
  }
 },

 generateTemplate(chunkX: number, chunkZ: number) {
  let baseY = 47;
  let yAdd = 0;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ + 1; z++) {
    let tree = Math.random() > 0.9;
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y > 0 && y < baseY - 1) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
     }
     if (y >= baseY - 1) {
      if (y == baseY - 1) {
       DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
      }
      if (y == baseY ) {
       if (tree) {
        this.generateTree(x, y  - 1, z);
        continue;
       } else {
      //  DVEW.worldData.paintVoxel("dve:dreamgrass", "default", 0, x, y, z);
       }
      }
     }
    }
   }
  }
 },

 generatePondChunk(chunkX: number, chunkZ: number) {
  let baseY = 31;
  let topY = 50;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y <= baseY - 1) {
      DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
     }
     if (y > baseY - 1 && y < baseY + 1) {
      DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, x, y, z);
     }
     if (y <= baseY + 2 && baseY >= baseY) {
      if (x == chunkX + 15 || z == chunkZ + 15 || x == chunkX || z == chunkZ) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      }
     }
     if (y <= baseY + 1 && baseY >= baseY) {
      if (
       (z == chunkZ + 7 && x == chunkX + 7) ||
       (z == chunkZ + 8 && x == chunkX + 8) ||
       (z == chunkZ + 7 && x == chunkX + 8) ||
       (z == chunkZ + 8 && x == chunkX + 7) ||
       (z == chunkZ + 11 && x == chunkX + 7) ||
       (z == chunkZ + 5 && x == chunkX + 7) ||
       //corners
       //=======
       (z == chunkZ + 13 && x == chunkX + 13) ||
       (z == chunkZ + 14 && x == chunkX + 13) ||
       (z == chunkZ + 13 && x == chunkX + 14) ||
       //=======
       (z == chunkZ + 2 && x == chunkX + 1) ||
       (z == chunkZ + 2 && x == chunkX + 2) ||
       (z == chunkZ + 1 && x == chunkX + 2) ||
       //=======
       (z == chunkZ + 13 && x == chunkX + 1) ||
       (z == chunkZ + 14 && x == chunkX + 2) ||
       (z == chunkZ + 13 && x == chunkX + 2) ||
       //=======
       (z == chunkZ + 2 && x == chunkX + 14) ||
       (z == chunkZ + 2 && x == chunkX + 13) ||
       (z == chunkZ + 1 && x == chunkX + 13)
      ) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      }
     }
     if (y == baseY + 1 && z == chunkZ + 14 && x == chunkX + 7) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
     }
     if (y <= 46 && z == chunkZ + 7 && x == chunkX + 7) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
     }
     if (y <= 36 && z == chunkZ + 7 && x == chunkX + 6) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
     }
    }
   }
  }
 },

 generatePillarChunk(chunkX: number, chunkZ: number) {
  let baseY = 31;
  let topY = 50;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    let addVine = false;
    if (x == chunkX) {
     addVine = Math.random() > 0.5;
    }
    if (x == chunkX + 15) {
     addVine = Math.random() > 0.5;
    }
    if (z == chunkZ) {
     addVine = Math.random() > 0.5;
    }
    if (z == chunkZ + 15) {
     addVine = Math.random() > 0.5;
    }
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y < baseY) {
      DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
     }

     if (y >= baseY && y <= topY) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      if (addVine && x == chunkX) {
       DVEW.worldData.paintVoxel("dve:dreamvine", "default", 2, x - 1, y, z);
      }
      if (addVine && x == chunkX + 15) {
       DVEW.worldData.paintVoxel("dve:dreamvine", "default", 3, x + 1, y, z);
      }
      if (addVine && z == chunkZ) {
       DVEW.worldData.paintVoxel("dve:dreamvine", "default", 1, x, y, z - 1);
      }
      if (addVine && z == chunkZ + 15) {
       DVEW.worldData.paintVoxel("dve:dreamvine", "default", 0, x, y, z + 1);
      }
     }
    }
   }
  }
 },
 generateDefaultChunk(chunkX: number, chunkZ: number) {
  let topY = 31;
  let groundY = 31;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y < groundY) {
      DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      continue;
     }
     let flip = Math.random();
     if (flip >= 0.1) {
      continue;
     }
     if (flip <= 0.01) {
      DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", 0, x, topY, z);
      continue;
     }
     if (flip >= 0.01 && flip <= 0.02) {
      DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, topY, z);
      let flip2 = Math.random();
      if (flip2 < 0.01) {
       this.generateTree(x, topY, z);
      }
      continue;
     }
     if (flip >= 0.02 && flip <= 0.03) {
      DVEW.worldData.paintVoxel("dve:dreamgrass", "default", 0, x, topY, z);
      continue;
     }
    }
   }
  }
 },

 generateChunk(chunkX: number, chunkZ: number, type: string = "default") {
  if (type == "pillar") {
   this.generatePillarChunk(chunkX, chunkZ);
  }

  if (type == "pond") {
   this.generatePondChunk(chunkX, chunkZ);
  }

  if (type == "temple") {
   this.generateTemplate(chunkX, chunkZ);
  }

  if (type == "stair") {
   this.generateStairChunk(chunkX, chunkZ);
  }

  if (type == "default") {
   this.generateDefaultChunk(chunkX, chunkZ);
  }
 },
};
