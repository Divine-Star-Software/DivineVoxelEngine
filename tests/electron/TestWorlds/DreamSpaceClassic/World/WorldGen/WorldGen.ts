import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";

const brush = DVEW.getBrush();

export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 worldHeight: 256,
 minY: 60,

 generateCrazyChunk(chunkX: number, chunkZ: number) {
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.worldHeight; y++) {
     if (y < Math.floor(Math.random() * this.minY)) {
      brush.setId("dve_dreadstone");
      brush.setXYZ(x, y, z).paint();
      if (Math.random() > 0.8) {
       brush.setId("dve_dreadgrass");
       brush.setXYZ(x, y + 1, z).paint();
      }
     }
    }
   }
  }
 },

 generateSpikeChunk(chunkX: number, chunkZ: number) {
  brush.setId("dve_dreadstonepillar");

  let rx = 0;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   let rz = 0;
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < 200; y++) {
     brush.setXYZ(x, y, z);

     if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
      if (
       y == this.minY ||
       y == this.minY + 28 ||
       y == this.minY + 54 ||
       y == this.minY + 56 ||
       y == this.minY + 86
      ) {
       brush.setId("dve_dreadstonepillar").paint();
      }
     }
     brush.setId("dve_dreadstonepillar");
     if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
      if (
       y == this.minY + 1 ||
       y == this.minY + 26 ||
       y == this.minY + 30 ||
       y == this.minY + 52 ||
       y == this.minY + 58 ||
       y == this.minY + 84 ||
       y == this.minY + 88
      ) {
       brush.paint();
      }
     }
     if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
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
       brush.paint();
      }
     }
     if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
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
       brush.paint();
      }
     }
     if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
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
       brush.paint();
      }
     }
     if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
      if (
       y == this.minY + 8 ||
       y == this.minY + 18 ||
       y == this.minY + 38 ||
       y == this.minY + 46 ||
       y == this.minY + 66 ||
       y == this.minY + 74 ||
       y == this.minY + 96
      ) {
       brush.paint();
      }
     }
     if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
      if (
       y == this.minY + 10 ||
       y == this.minY + 16 ||
       y == this.minY + 40 ||
       y == this.minY + 44 ||
       y == this.minY + 68 ||
       y == this.minY + 72 ||
       y == this.minY + 98
      ) {
       brush.paint();
      }
     }
     if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
      if (
       y == this.minY + 12 ||
       y == this.minY + 14 ||
       y == this.minY + 42 ||
       y == this.minY + 70 ||
       this.minY + 100
      ) {
       brush.paint();
      }
     }

     if (y < this.minY) {
      brush.paint();
     }
    }
    rz++;
   }
   rx++;
  }
 },

 generatePondChunk(chunkX: number, chunkZ: number) {
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.worldHeight; y++) {
     brush.setId("dve_dreadstone").setXYZ(x, y, z);
     if (y < this.minY - 6) {
      brush.paint();
     }
     brush.setId("dve_liquiddreadether");
     if (y >= this.minY - 6 && y <= this.minY) {
      brush.paint();
     }
     if (y == this.minY + 1) break;
    }
   }
  }
  return true;
 },

 generateHoleChunk(chunkX: number, chunkZ: number) {
  let rx = 0;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   let rz = 0;
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.worldHeight; y++) {
     if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
      if (y > this.minY) break;
      if (y == this.minY) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
      if (y == this.minY - 1) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
      if (y == this.minY - 2) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
      if (y == this.minY - 3) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
      if (y == this.minY - 4) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
      if (y == this.minY - 5) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }
     if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
      if (y == this.minY - 6) {
       brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
       if (Math.random() > 0.8) {
        brush
         .setId("dve_dreadgrass")
         .setXYZ(x, y + 1, z)
         .paint();
       }
      }
     }

     if (y < this.minY - 7) {
      brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
      if (Math.random() > 0.8) {
       brush
        .setId("dve_dreadgrass")
        .setXYZ(x, y + 1, z)
        .paint();
      }
     }
    }
    rz++;
   }
   rx++;
  }
 },

 generateNormalChunk(chunkX: number, chunkZ: number) {
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.worldHeight; y++) {
     if (y > this.minY + 1) break;
     if (y <= this.minY) {
      brush.setId("dve_dreadstone").setXYZ(x, y, z).paint();
     }
     if (y == this.minY + 1) {
      if (Math.random() > 0.8) {
       brush.setId("dve_dreadgrass").setXYZ(x, y, z).paint();
      }
     }
    }
   }
  }
 },

 generateWorldColumn(chunkX: number, chunkZ: number) {
  brush.start();
  let toss = Math.random();
  let spiked = false;
  let crazy = false;
  let hole = false;
  let pond = false;
  if (toss < 0.2) {
   crazy = true;
  }
  if (toss > 0.2 && toss < 0.3) {
   spiked = true;
  }
  if (toss > 0.3 && toss < 0.6) {
   hole = true;
  }
  if (toss > 0.8) {
   pond = true;
  }
  if (crazy) {
   this.generateCrazyChunk(chunkX, chunkZ);
   return;
  }
  if (hole) {
   this.generateHoleChunk(chunkX, chunkZ);
   return;
  }
  if (spiked) {
   this.generateSpikeChunk(chunkX, chunkZ);
   return;
  }
  if (pond) {
   this.generatePondChunk(chunkX, chunkZ);
   return;
  }
  this.generateNormalChunk(chunkX, chunkZ);

  brush.stop();
 },
};
