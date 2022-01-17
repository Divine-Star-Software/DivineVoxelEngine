import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
import type { WorldGen } from "../WorldGen/WorldGen";

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

 playerReach = 4;

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
  setInterval(async () => {
   // console.log(this.playerDirection, this.playerABSPositon);

   const pickVector = [
    this.playerDirection[0] * this.playerReach + this.playerABSPositon[0],
    this.playerDirection[1] * this.playerReach + this.playerABSPositon[1],
    this.playerDirection[2] * this.playerReach + this.playerABSPositon[2],
   ];

   const pAbsX = Math.floor(this.playerABSPositon[0]);
   const pAbsY = Math.floor(this.playerABSPositon[1]);
   const pAbsZ = Math.floor(this.playerABSPositon[2]);

   const data = plotLine3d(
    pAbsX,
    pAbsY,
    pAbsZ,
    Math.floor(pickVector[0]),
    Math.floor(pickVector[1]),
    Math.floor(pickVector[2])
   );
   const chunkX = this.playerChunkPosition[0];
   const chunkZ = this.playerChunkPosition[1];
   let i = 3;
   for (i; i < data.length; i += 3) {
    const voxelData = this.DVEW.worldData.getRealtiveVoxelData(
     chunkX,
     chunkZ,
     data[i],
     data[i + 1],
     data[i + 2]
    );

    if (voxelData[0]) {
     break;
    }
   }
   this.playerPickPosition[0] = data[i];
   this.playerPickPosition[1] = data[i + 1];
   this.playerPickPosition[2] = data[i + 2];

   const voxelData = this.DVEW.worldData.getRealtiveVoxelData(
    chunkX,
    chunkZ,
    pAbsX,
    pAbsY,
    pAbsZ,
    0,
    -1,
    0
   );
   if(voxelData){
     this.playerStatesArray[0] = 1;
   } else {
    this.playerStatesArray[0] = 0;
   }

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
   }
  }, 20);
 }
}
