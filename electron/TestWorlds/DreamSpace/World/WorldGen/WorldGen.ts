import type { ChunkData } from "../../../../out/Meta/index";
import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 _3dArray: DVEW.UTIL.getFlat3DArray(),
 chunkDepth: 16,
 chunkWidth: 16,
 worldHeight: 256,
 minY: 60,

 generateCrazyChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  if (y < Math.floor(Math.random() * this.minY)) {
   DVEW.worldData.paintVoxel(
    "dve:dreamstone",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
   if (Math.random() > 0.8) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y + 1,
     chunkZ + z
    );
   }
  }
 },

 generateSpikeChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  if (x == 0 || z == 0 || x == 15 || z == 15) {
   if (
    y == this.minY ||
    y == this.minY + 28 ||
    y == this.minY + 54 ||
    y == this.minY + 56 ||
    y == this.minY + 86
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 0 || z == 0 || x == 15 || z == 15) {
   if (
    y == this.minY + 1 ||
    y == this.minY + 26 ||
    y == this.minY + 30 ||
    y == this.minY + 52 ||
    y == this.minY + 58 ||
    y == this.minY + 84 ||
    y == this.minY + 88
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 1 || z == 1 || x == 14 || z == 14) {
   if (
    y == this.minY + 2 ||
    y == this.minY + 24 ||
    y == this.minY + 32 ||
    y == this.minY + 52 ||
    y == this.minY + 60 ||
    y == this.minY + 82 ||
    y == this.minY + 86 ||
    y == this.minY + 90
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 2 || z == 2 || x == 13 || z == 13) {
   if (
    y == this.minY + 4 ||
    y == this.minY + 22 ||
    y == this.minY + 34 ||
    y == this.minY + 50 ||
    y == this.minY + 62 ||
    y == this.minY + 80 ||
    y == this.minY + 88 ||
    y == this.minY + 92
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 3 || z == 3 || x == 12 || z == 12) {
   if (
    y == this.minY + 6 ||
    y == this.minY + 20 ||
    y == this.minY + 36 ||
    y == this.minY + 48 ||
    y == this.minY + 64 ||
    y == this.minY + 78 ||
    y == this.minY + 90 ||
    y == this.minY + 94
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 4 || z == 4 || x == 11 || z == 11) {
   if (
    y == this.minY + 8 ||
    y == this.minY + 18 ||
    y == this.minY + 38 ||
    y == this.minY + 46 ||
    y == this.minY + 66 ||
    y == this.minY + 74 ||
    y == this.minY + 96
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 5 || z == 5 || x == 10 || z == 10) {
   if (
    y == this.minY + 10 ||
    y == this.minY + 16 ||
    y == this.minY + 40 ||
    y == this.minY + 44 ||
    y == this.minY + 68 ||
    y == this.minY + 72 ||
    y == this.minY + 98
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
  if (x == 6 || z == 6 || x == 9 || z == 9) {
   if (
    y == this.minY + 12 ||
    y == this.minY + 14 ||
    y == this.minY + 42 ||
    y == this.minY + 70 ||
    this.minY + 100
   ) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstonepillar",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }

  if (y < this.minY) {
   DVEW.worldData.paintVoxel(
    "dve:dreamstonepillar",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
  }
 },

 generatePondChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  if (y < this.minY - 6) {
   DVEW.worldData.paintVoxel(
    "dve:dreamstone",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
  }

  if (y >= this.minY - 6 && y <= this.minY) {
   DVEW.worldData.paintVoxel(
    "dve:liquiddreamether",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
  }
 },

 generateHoleChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  if (x == 0 || z == 0 || x == 15 || z == 15) {
   if (y == this.minY) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 1 || z == 1 || x == 14 || z == 14) {
   if (y == this.minY - 1) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 2 || z == 2 || x == 13 || z == 13) {
   if (y == this.minY - 2) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 3 || z == 3 || x == 12 || z == 12) {
   if (y == this.minY - 3) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 4 || z == 4 || x == 11 || z == 11) {
   if (y == this.minY - 4) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 5 || z == 5 || x == 10 || z == 10) {
   if (y == this.minY - 5) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }
  if (x == 6 || z == 6 || x == 9 || z == 9) {
   if (y == this.minY - 6) {
    DVEW.worldData.paintVoxel(
     "dve:dreamstone",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
    if (Math.random() > 0.8) {
     DVEW.worldData.paintVoxel(
      "dve:dreamgrass",
      "default",
      chunkX + x,
      chunkY + y + 1,
      chunkZ + z
     );
    }
   }
  }

  if (y < this.minY - 7) {
   DVEW.worldData.paintVoxel(
    "dve:dreamstone",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
   if (Math.random() > 0.8) {
    DVEW.worldData.paintVoxel(
     "dve:dreamgrass",
     "default",
     chunkX + x,
     chunkY + y + 1,
     chunkZ + z
    );
   }
  }
 },

 generateNormalChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  x: number,
  y: number,
  z: number
 ) {
  if (y < this.minY) {
   DVEW.worldData.paintVoxel(
    "dve:dreamgrassblock",
    "default",
    chunkX + x,
    chunkY + y,
    chunkZ + z
   );
  }
  if (y == this.minY) {
   if (Math.random() > 0.8) {
    DVEW.worldData.paintVoxel(
     "dve:dreamgrass",
     "default",
     chunkX + x,
     chunkY + y,
     chunkZ + z
    );
   }
  }
 },

 generateChunkNormal(chunkX: number, chunkZ: number) {
  let toss = Math.random();

  let maxY = 256;
  let spiked = false;
  let crazy = false;
  let hole = false;
  let pond = false;
  let normal = true;
  if (toss < 0.2) {
   crazy = true;
  }
  if (toss > 0.2 && toss < 0.3) {
   spiked = true;
  }
  if (toss > 0.3 && toss < 0.6) {
   hole = true;
  }
  if (toss > 0.6) {
   pond = true;
  }

  if (crazy || spiked || hole || pond) {
   normal = false;
  }

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.worldHeight; y++) {
     if (pond) {
      this.generatePondChunk(chunkX, 0, chunkZ, x, y, z);
     }
     if (crazy) {
      this.generateCrazyChunk(chunkX, 0, chunkZ, x, y, z);
     }
     if (spiked) {
      this.generateSpikeChunk(chunkX, 0, chunkZ, x, y, z);
     }
     if (hole) {
      this.generateHoleChunk(chunkX, 0, chunkZ, x, y, z);
     }
     if (normal) {
      this.generateNormalChunk(chunkX, 0, chunkZ, x, y, z);
     }
    }
   }
  }
 },
};
