import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateNormalChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = (64 + Math.random() * 5) >> 0;
  let pondY = 30;
  let holeMade = false;
  let hole = false;
  let noHole = Math.random() > 0.2;
  let add = Math.random() > 0.5 ? -1 : 1;
  let spaceHeight = (15 + Math.random() * 3 * add) >> 0;
  let lampMax = 5;
  let currentLamp = 0;
  // let noHole = true;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    hole = false;
    if (Math.random() > 0.9 && !holeMade && !noHole) {
     hole = true;
     holeMade = true;
    }
    let addLamp = false;
    let flip = Math.random();
    if (flip > 0.5 && flip < 0.55 && currentLamp < lampMax) {
     addLamp = true;
     currentLamp++;
    }
    let pillar = Math.random() > 0.98;
    let pondPilar = Math.random() > 0.98;
    let pillarFluid = Math.random() > 0.98;
    let pondPillarSpikeHeight = (2 + Math.random() * 20) >> 0;
    let pondSpikeHeight = (2 + Math.random() * 4) >> 0;
    let spikeHeight = (4 + Math.random() * 6) >> 0;
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y >= maxY - 20 - spaceHeight && y <= maxY + 6 && hole) {
      continue;
     }
     let tx = x + chunkX;
     let ty = y + chunkY;
     let tz = z + chunkZ;

     if (pillarFluid && y < spikeHeight + maxY + add * spaceHeight) {
      DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, tx, ty, tz);
      continue;
     }
     if (pondPilar && y <= pondY + pondPillarSpikeHeight) {
      if (y == pondY + pondPillarSpikeHeight) {
       DVEW.worldData.paintVoxel("dve:dreamlamp", 0, 0, tx, ty, tz);
      } else {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, tx, ty, tz);
      }
     } else {
      if (y <= 20 + pondSpikeHeight) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, tx, ty, tz);
      }
      if (y >= 20 + pondSpikeHeight && y <= pondY) {
       DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, tx, ty, tz);
      }
     }

     if (
      y >= maxY + add * spaceHeight - spikeHeight + 5 &&
      y <= spikeHeight + maxY + add * spaceHeight
     ) {
      if (x == 0 || z == 0 || x == 15 || z == 15) {
       if (Math.random() > 0.7) {
        continue;
       }
      }
      if (y < maxY + spaceHeight) {
       if (!pillar) {
        DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, tx, ty, tz);
       } else {
        if (y == maxY + add * spaceHeight - spikeHeight + 5) {
         DVEW.worldData.paintVoxel("dve:dreamlamp", 0, 0, tx, ty, tz);
        } else {
         DVEW.worldData.paintVoxel(
          "dve:dreamstonepillar",
          0, 0,
          tx,
          ty,
          tz
         );
        }
       }
      } else {
       DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, tx, ty, tz);
      }
     }
     if (y == maxY + add * spaceHeight + spikeHeight + 1) {
      if (Math.random() > 0.9) {
       DVEW.worldData.paintVoxel("dve:dreamgrass", 0, 0, tx, ty, tz);
      } else {
       if (Math.random() > 0.98) {
        DVEW.worldData.paintVoxel("dve:dreamstoneslab", 0, 0, tx, ty, tz);
       }
      }
     }
    }
   }
  }
 },

 generatePondChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = 30;
  let spaceHeight = (10 + Math.random() * 3) >> 0;
  let add = Math.random() > 0.5 ? -1 : 1;

  // let noHole = true;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    let spikeHeight = (2 + Math.random() * 4) >> 0;
    let pillar = Math.random() > 0.98;
    let pillarHeight = (5 + Math.random() * 5) >> 0;
    for (let y = 0; y <= maxY + spaceHeight + pillarHeight; y++) {
     let tx = x + chunkX;
     let ty = y + chunkY;
     let tz = z + chunkZ;
     if (!pillar) {
      if (y <= maxY - spaceHeight + 1) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, tx, ty, tz);
      }
      if (y > maxY - spaceHeight && y <= maxY - spaceHeight + spikeHeight) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, tx, ty, tz);
      }
      if (y <= maxY && y >= maxY - spaceHeight + spikeHeight) {
       DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, tx, ty, tz);
      }
     } else {
      if (y < maxY + spaceHeight + pillarHeight) {
       DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, tx, ty, tz);
      }
      if (y == maxY + spaceHeight + pillarHeight) {
       DVEW.worldData.paintVoxel("dve:dreamlamp", 0, 0, tx, ty, tz);
      }
     }
    }
   }
  }
 },

 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let test = Math.random();
  if (test <= 0.8) {
   this.generateNormalChunk(chunkX, chunkY, chunkZ);
  } else {
   this.generatePondChunk(chunkX, chunkY, chunkZ);
  }
 },
};
