import type { WorldData } from "World/WorldData/WorldData";
export function GetRelativeVoxelData(
 this: WorldData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 blockX: number,
 blockY: number,
 blockZ: number,
 x: number = 0,
 y: number = 0,
 z: number = 0
) {
 if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) return;
 const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`].voxels;

 if (blockX > 0 && blockZ > 0 && blockX < 15 && blockZ < 15) {
  return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
 }
 if (blockX == 0 && blockZ > 0 && blockZ < 15) {
  if (x >= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
 }
 if (blockX == 15 && blockZ < 15 && blockZ > 0) {
  if (x > 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
 }
 if (blockZ == 0 && blockX > 0 && blockX < 15) {
  if (z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (z >= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
 }
 if (blockZ == 15 && blockX < 15 && blockX > 0) {
  if (z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (z <= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
 }
 //bottom left corner south west
 if (blockX == 0 && blockZ == 0) {
  if (x >= 0 && z >= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0 && z >= 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x >= 0 && z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x < 0 && z < 0) {
   const southWestChunkData =
    this.chunks[`${chunkX - 16}-${chunkZ - 16}-${chunkY}`];
   if (!southWestChunkData) return false;
   const southWestChunk = southWestChunkData.voxels;
   if (
    southWestChunk[15] &&
    southWestChunk[15][15] &&
    southWestChunk[15][15][blockY + y] !== undefined
   ) {
    return southWestChunk[15][15][blockY + y];
   }
  }
 }
 //bottom left corner south east
 if (blockX == 15 && blockZ == 0) {
  if (x <= 0 && z >= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (x > 0 && z >= 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0 && z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x > 0 && z < 0) {
   const southEastChunkData =
    this.chunks[`${chunkX + 16}-${chunkZ - 16}-${chunkY}`];
   if (!southEastChunkData) return false;
   const southEastChunk = southEastChunkData.voxels;
   if (
    southEastChunk[0] &&
    southEastChunk[0][15] &&
    southEastChunk[0][15][blockY + y] !== undefined
   ) {
    return southEastChunk[0][15][blockY + y];
   }
  }
 }
 //top left corner north west
 if (blockX == 0 && blockZ == 15) {
  if (x >= 0 && z <= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0 && z <= 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x >= 0 && z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x < 0 && z > 0) {
   const northWestChunkData =
    this.chunks[`${chunkX - 16}-${chunkZ - +16}-${chunkY}`];
   if (!northWestChunkData) return false;
   const northWestChunk = northWestChunkData.voxels;
   if (
    northWestChunk[15] &&
    northWestChunk[15][0] &&
    northWestChunk[15][0][blockY + y] !== undefined
   ) {
    return northWestChunk[15][0][blockY + y];
   }
  }
 }
 //top right corner north east
 if (blockX == 15 && blockZ == 15) {
  if (x <= 0 && z <= 0) {
   return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (x > 0 && z <= 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0 && z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x > 0 && z > 0) {
   const northEastChunkData =
    this.chunks[`${chunkX + 16}-${chunkZ + 16}-${chunkY}`];
   if (!northEastChunkData) return false;
   const northEastChunk = northEastChunkData.voxels;
   if (
    northEastChunk[0] &&
    northEastChunk[0][0] &&
    northEastChunk[0][0][blockY + y] !== undefined
   ) {
    return northEastChunk[0][0][blockY + y];
   }
  }
 }
 return false;
}
export function GetVoxelData(
 this: WorldData,
 blockX: number,
 blockY: number,
 blockZ: number,
 x: number = 0,
 y: number = 0,
 z: number = 0
) {
 const chunkX = (blockX >> 4) << 4;
 const chunkY = (blockY >> 7) << 7;
 const chunkZ = (blockZ >> 4) << 4;
 const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
 if (!chunk) return false;
 const chunkVoxels = chunk.voxels;
 [blockX, blockZ] = this._getRelativeChunkPosition(
  chunkX,
  chunkY,
  chunkZ,
  blockX,
  blockY,
  blockZ
 );

 if (blockX > 0 && blockZ > 0 && blockX < 15 && blockZ < 15) {
  return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
 }
 if (blockX == 0 && blockZ > 0 && blockZ < 15) {
  if (x >= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
 }
 if (blockX == 15 && blockZ < 15 && blockZ > 0) {
  if (x > 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
 }
 if (blockZ == 0 && blockX > 0 && blockX < 15) {
  if (z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (z >= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
 }
 if (blockZ == 15 && blockX < 15 && blockX > 0) {
  if (z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (z <= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
 }
 //bottom left corner south west
 if (blockX == 0 && blockZ == 0) {
  if (x >= 0 && z >= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0 && z >= 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x >= 0 && z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x < 0 && z < 0) {
   const southWestChunkData =
    this.chunks[`${chunkX - 16}-${chunkZ - 16}-${chunkY}`];
   if (!southWestChunkData || southWestChunkData.isEmpty) return false;
   const southWestChunk = southWestChunkData.voxels;
   if (
    southWestChunk[15] &&
    southWestChunk[15][15] &&
    southWestChunk[15][15][blockY + y] !== undefined
   ) {
    return southWestChunk[15][15][blockY + y];
   }
  }
 }
 //bottom left corner south east
 if (blockX == 15 && blockZ == 0) {
  if (x <= 0 && z >= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
  if (x > 0 && z >= 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0 && z < 0) {
   return checkSouth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x > 0 && z < 0) {
   const southEastChunkData =
    this.chunks[`${chunkX + 16}-${chunkZ - 16}-${chunkY}`];
   if (!southEastChunkData || southEastChunkData.isEmpty) return false;
   const southEastChunk = southEastChunkData.voxels;
   if (
    southEastChunk[0] &&
    southEastChunk[0][15] &&
    southEastChunk[0][15][blockY + y] !== undefined
   ) {
    return southEastChunk[0][15][blockY + y];
   }
  }
 }
 //top left corner north west
 if (blockX == 0 && blockZ == 15) {
  if (x >= 0 && z <= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
  if (x < 0 && z <= 0) {
   return checkWest(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x >= 0 && z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x < 0 && z > 0) {
   const northWestChunkData =
    this.chunks[`${chunkX - 16}-${chunkZ - +16}-${chunkY}`];
   if (!northWestChunkData || northWestChunkData.isEmpty) return false;
   const northWestChunk = northWestChunkData.voxels;
   if (
    northWestChunk[15] &&
    northWestChunk[15][0] &&
    northWestChunk[15][0][blockY + y] !== undefined
   ) {
    return northWestChunk[15][0][blockY + y];
   }
  }
 }
 //top right corner north east
 if (blockX == 15 && blockZ == 15) {
  if (x <= 0 && z <= 0) {
   return checkNormal(chunkVoxels, blockX, blockY, blockZ, x, y, z);
  }
  if (x > 0 && z <= 0) {
   return checkEast(this, chunkX, chunkY, chunkZ, blockY, blockZ, y, z);
  }
  if (x <= 0 && z > 0) {
   return checkNorth(this, chunkX, chunkY, chunkZ, blockX, blockY, x, y);
  }
  if (x > 0 && z > 0) {
   const northEastChunkData =
    this.chunks[`${chunkX + 16}-${chunkZ + 16}-${chunkY}`];
   if (!northEastChunkData || northEastChunkData.isEmpty) return false;
   const northEastChunk = northEastChunkData.voxels;
   if (
    northEastChunk[0] &&
    northEastChunk[0][0] &&
    northEastChunk[0][0][blockY + y] !== undefined
   ) {
    return northEastChunk[0][0][blockY + y];
   }
  }
 }
 return false;
}
const checkNormal = (
 chunk: number[][][],
 blockX: number,
 blockY: number,
 blockZ: number,
 x: number,
 y: number,
 z: number
) => {
 if (
  chunk[blockX + x] &&
  chunk[blockX + x][blockZ + z] &&
  chunk[blockX + x][blockZ + z][blockY + y] !== undefined
 ) {
  return chunk[blockX + x][blockZ + z][blockY + y];
 }
 return false;
};
const checkNorth = (
 worldData: WorldData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 blockX: number,
 blockY: number,
 x: number,
 y: number
) => {
 const northChunkData = worldData.chunks[`${chunkX}-${chunkZ + 16}-${chunkY}`];
 if (!northChunkData || northChunkData.isEmpty) return false;
 const northChunk = northChunkData.voxels;
 if (
  northChunk[blockX + x] &&
  northChunk[blockX + x][0] &&
  northChunk[blockX + x][0][blockY + y] !== undefined
 ) {
  return northChunk[blockX + x][0][blockY + y];
 }
 return false;
};
const checkSouth = (
 worldData: WorldData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 blockX: number,
 blockY: number,
 x: number,
 y: number
) => {
 const southChunkData = worldData.chunks[`${chunkX}-${chunkZ - 16}-${chunkY}`];
 if (!southChunkData || southChunkData.isEmpty) return false;
 const southChunk = southChunkData.voxels;
 if (
  southChunk[blockX + x] &&
  southChunk[blockX + x][15] &&
  southChunk[blockX + x][15][blockY + y] !== undefined
 ) {
  return southChunk[blockX + x][15][blockY + y];
 }
 return false;
};
const checkEast = (
 worldData: WorldData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 blockY: number,
 blockZ: number,
 y: number,
 z: number
) => {
 const eastChunkData = worldData.chunks[`${chunkX + 16}-${chunkZ}-${chunkY}`];
 if (!eastChunkData || eastChunkData.isEmpty) return false;
 const eastChunk = eastChunkData.voxels;
 if (
  eastChunk[0] &&
  eastChunk[0][blockZ + z] &&
  eastChunk[0][blockZ + z][blockY + y] !== undefined
 ) {
  return eastChunk[0][blockZ + z][blockY + y];
 }
 return false;
};
const checkWest = (
 worldData: WorldData,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 blockY: number,
 blockZ: number,
 y: number,
 z: number
) => {
 const westChunkData = worldData.chunks[`${chunkX - 16}-${chunkZ}-${chunkY}`];
 if (!westChunkData || westChunkData.isEmpty) return false;
 const westChunk = westChunkData.voxels;
 if (
  westChunk[15] &&
  westChunk[15][blockZ + z] &&
  westChunk[15][blockZ + z][blockY + y] !== undefined
 ) {
  return westChunk[15][blockZ + z][blockY + y];
 }
 return false;
};
