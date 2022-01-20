import { VoxelInteface } from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
import type { WorldGen } from "../WorldGen/WorldGen";

function visitAll(
 gx0: number,
 gy0: number,
 gz0: number,
 gx1: number,
 gy1: number,
 gz1: number
 // visitor: (x: number, y: number, z: number) => {}
) {
 const positons = [];
 var gx0idx = Math.floor(gx0);
 var gy0idx = Math.floor(gy0);
 var gz0idx = Math.floor(gz0);

 var gx1idx = Math.floor(gx1);
 var gy1idx = Math.floor(gy1);
 var gz1idx = Math.floor(gz1);

 var sx = gx1idx > gx0idx ? 1 : gx1idx < gx0idx ? -1 : 0;
 var sy = gy1idx > gy0idx ? 1 : gy1idx < gy0idx ? -1 : 0;
 var sz = gz1idx > gz0idx ? 1 : gz1idx < gz0idx ? -1 : 0;

 var gx = gx0idx;
 var gy = gy0idx;
 var gz = gz0idx;

 //Planes for each axis that we will next cross
 var gxp = gx0idx + (gx1idx > gx0idx ? 1 : 0);
 var gyp = gy0idx + (gy1idx > gy0idx ? 1 : 0);
 var gzp = gz0idx + (gz1idx > gz0idx ? 1 : 0);

 //Only used for multiplying up the error margins
 var vx = gx1 === gx0 ? 1 : gx1 - gx0;
 var vy = gy1 === gy0 ? 1 : gy1 - gy0;
 var vz = gz1 === gz0 ? 1 : gz1 - gz0;

 //Error is normalized to vx * vy * vz so we only have to multiply up
 var vxvy = vx * vy;
 var vxvz = vx * vz;
 var vyvz = vy * vz;

 //Error from the next plane accumulators, scaled up by vx*vy*vz
 // gx0 + vx * rx === gxp
 // vx * rx === gxp - gx0
 // rx === (gxp - gx0) / vx
 var errx = (gxp - gx0) * vyvz;
 var erry = (gyp - gy0) * vxvz;
 var errz = (gzp - gz0) * vxvy;

 var derrx = sx * vyvz;
 var derry = sy * vxvz;
 var derrz = sz * vxvy;

 do {
  //  visitor(gx, gy, gz);

  positons.push(gx, gy, gz);
  if (gx === gx1idx && gy === gy1idx && gz === gz1idx) break;

  //Which plane do we cross first?
  var xr = Math.abs(errx);
  var yr = Math.abs(erry);
  var zr = Math.abs(errz);

  if (sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)) {
   gx += sx;
   errx += derrx;
  } else if (sy !== 0 && (sz === 0 || yr < zr)) {
   gy += sy;
   erry += derry;
  } else if (sz !== 0) {
   gz += sz;
   errz += derrz;
  }
 } while (true);
 return positons;
}

function plotLine3d(
 x0: number,
 y0: number,
 z0: number,
 x1: number,
 y1: number,
 z1: number
) {
 const pooints = [];
 const dx = Math.abs(x1 - x0),
  sx = x0 < x1 ? 1 : -1;
 const dy = Math.abs(y1 - y0),
  sy = y0 < y1 ? 1 : -1;
 const dz = Math.abs(z1 - z0),
  sz = z0 < z1 ? 1 : -1;
 let dm = Math.max(dx, dy, dz),
  i = dm; /* maximum difference */
 x1 = y1 = z1 = dm / 2; /* error offset */

 while (true) {
  /* loop */
  pooints.push(x0, y0, z0);
  if (i-- == 0) break;
  x1 -= dx;
  if (x1 < 0) {
   x1 += dm;
   x0 += sx;
  }
  y1 -= dy;
  if (y1 < 0) {
   y1 += dm;
   y0 += sy;
  }
  z1 -= dz;
  if (z1 < 0) {
   z1 += dm;
   z0 += sz;
  }
 }

 return pooints;
}

/**# Player Watcher
 * ---
 * Keeps track of the players movement and
 * singles the world to add or remove chunks
 * based on their new position and render distance.
 */
export class PlayerWatcher {
 playerABSPositon: Float32Array;
 playerChunkPosition: Float32Array;
 playerDirection: Float32Array;
 playerPickPosition: Float32Array;
 playerStatesArray: Uint8Array;

 renderDistance = 20;

 currentMaxChunkX = 160;
 currentMinChunkX = -144;
 currentMaxChunkZ = 160;
 currentMinChunkZ = -144;

 cachedChunkZ = 0;
 cachedChunkX = 0;

 playerReach = 8;

 constructor(
  private worldGen: WorldGen,
  private DVEW: DivineVoxelEngineWorld
 ) {}

 setPlayerSharedArrays(data: any[]) {
  this.playerABSPositon = new Float32Array(data[1]);
  this.playerChunkPosition = new Float32Array(data[2]);
  this.playerDirection = new Float32Array(data[3]);
  this.playerPickPosition = new Float32Array(data[4]);
  this.playerStatesArray = new Uint8Array(data[5]);
 }

 async startWatchingPlayer() {
  this.cachedChunkX = this.playerChunkPosition[0];
  this.cachedChunkZ = this.playerChunkPosition[1];
  setInterval(() => {
   // console.log(this.playerDirection, this.playerABSPositon);
   const pickVector = [
    this.playerDirection[0] * this.playerReach + this.playerABSPositon[0],
    this.playerDirection[1] * this.playerReach + this.playerABSPositon[1],
    this.playerDirection[2] * this.playerReach + this.playerABSPositon[2],
   ];

   const pAbsX = Math.floor(this.playerABSPositon[0]);
   const pAbsY = Math.floor(this.playerABSPositon[1] + 0.5);
   const pAbsZ = Math.floor(this.playerABSPositon[2]);

   /*    const data = plotLine3d(
    pAbsX,
    pAbsY,
    pAbsZ,
    Math.floor(pickVector[0]),
    Math.floor(pickVector[1]),
    Math.floor(pickVector[2])
   ); */
   const data = visitAll(
    this.playerABSPositon[0],
    this.playerABSPositon[1],
    this.playerABSPositon[2],
    pickVector[0],
    pickVector[1],
    pickVector[2]
   );
   const chunkX = (pAbsX >> 4) << 4;
   const chunkY = (pAbsY >> 7) << 7;
   const chunkZ = (pAbsZ >> 4) << 4;

   let i = 0;
   let closestCalc = 0;
   let closestIndex = 6;

   for (i; i < data.length; i += 3) {
    const x = data[i];
    const y = data[i + 1];
    const z = data[i + 2];
    const voxelData = this.DVEW.worldData.getVoxelData(x, y, z);

    if (voxelData) {
     if (voxelData[0]) {
      break;
     }
    }
   }
   this.playerPickPosition[0] = data[i];
   this.playerPickPosition[1] = data[i + 1];
   this.playerPickPosition[2] = data[i + 2];

   //below player

   const belowVoxel = this.DVEW.worldData.getVoxelData(
    pAbsX,
    pAbsY,
    pAbsZ,

    0,

    -2,
    0
   );
   if (belowVoxel) {
    this.playerStatesArray[0] = 1;
   } else {
    this.playerStatesArray[0] = 0;
   }

   const headVoxel = this.DVEW.worldData.getVoxelData(
    pAbsX,
    pAbsY,
    pAbsZ,
    0,
    0,
    0
   );
   if (headVoxel) {
    if (
     this.DVEW.voxelManager.getVoxel(
      this.DVEW.worldGeneration.getGlobalVoxelPallet()[headVoxel[0]][0]
     ).data.substance == "fluid"
    ) {
     this.playerStatesArray[1] = 1;
    } else {
     this.playerStatesArray[1] = 0;
    }
   } else {
    this.playerStatesArray[1] = 0;
   }
   /* 
   let movedWest = false;
   let movedEast = false;
   let movedNorth = false;
   let movedSouth = false;

   if (this.cachedChunkX != chunkX) {
    if (this.cachedChunkX > chunkX) {
     movedWest = true;
    }
    if (this.cachedChunkX < chunkX) {
     movedEast = true;
    }
   }
   if (this.cachedChunkZ != chunkZ) {
    if (this.cachedChunkZ < chunkZ) {
     movedNorth = true;
    }
    if (this.cachedChunkZ > chunkZ) {
     movedSouth = true;
    }
   }

   let moved = false;
   if (movedNorth) {
    moved = true;
    this.currentMaxChunkZ += 16;
    this.currentMinChunkZ += 16;
    //add chunks to the north remove from the south
    this.worldGen.generateChunkLine(
     this.cachedChunkX,
     this.cachedChunkZ,
     "north"
    );
   }
   if (movedSouth) {
    moved = true;
    this.currentMaxChunkZ -= 16;
    this.currentMinChunkZ -= 16;
    //add chunks to the south remove from the north
    this.worldGen.generateChunkLine(
     this.cachedChunkX,
     this.cachedChunkZ,
     "south"
    );
   }
   if (movedWest) {
    moved = true;
    this.currentMaxChunkX -= 16;
    this.currentMinChunkX -= 16;
    //add chunks to the west remove from the east
    this.worldGen.generateChunkLine(
     this.cachedChunkX,
     this.cachedChunkZ,
     "west"
    );
   }
   if (movedEast) {
    moved = true;
    this.currentMaxChunkX += 16;
    this.currentMinChunkX += 16;
    //add chunks to the east remove from te wast
    this.worldGen.generateChunkLine(
     this.cachedChunkX,
     this.cachedChunkZ,
     "east"
    );
   }

   this.cachedChunkX = chunkX;
   this.cachedChunkZ = chunkZ;
   if (moved) {
   } */
  }, 10);
 }
}
