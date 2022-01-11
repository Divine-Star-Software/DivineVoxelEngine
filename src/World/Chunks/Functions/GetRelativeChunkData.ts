import type { WorldData } from "World/WorldData/WorldData";

export function GetRealtiveChunkData(
  worldData: WorldData,
  chunk: number[][][],
  chunkX: number,
  chunkZ: number,
  blockX: number,
  blockY: number,
  blockZ: number,
  x: number,
  y: number,
  z: number
) {
  if (blockX > 0 && blockZ > 0 && blockX < 15 && blockZ < 15) {
    return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
  }
  if (blockX == 0 && blockZ > 0 && blockZ < 15) {
    if (x >= 0) {
      return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
    }
    if (x < 0) {
      return checkWest(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
  }
  if (blockX == 15 && blockZ < 15 && blockZ > 0) {
    if (x > 0) {
      return checkEast(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
    if (x <= 0) {
      return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
    }
  }
  if (blockZ == 0 && blockX > 0 && blockX < 15) {
    if (z < 0) {
      return checkSouth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
    }
    if (z >= 0) {
      return checkNormal(chunk, blockX, blockY, blockZ, x, y, z);
    }
  }
  if (blockZ == 15 && blockX < 15 && blockX > 0) {
    if (z > 0) {
      return checkNorth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
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
      return checkWest(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
    if (x >= 0 && z < 0) {
      return checkSouth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
    }
    if (x < 0 && z < 0) {
      if (!worldData.chunks[chunkX - 16]) return false;
      if (!worldData.chunks[chunkX - 16][chunkZ - 16]) return false;
      const southWestChunk = worldData.chunks[chunkX - 16][chunkZ - 16];
      if (!southWestChunk) return false;
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
      return checkEast(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
    if (x <= 0 && z < 0) {
      return checkSouth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
    }
    if (x > 0 && z < 0) {
      if (!worldData.chunks[chunkX + 16]) return false;
      if (!worldData.chunks[chunkX + 16][chunkZ - 16]) return false;
      const southEastChunk = worldData.chunks[chunkX + 16][chunkZ - 16];
      if (!southEastChunk) return false;
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
      return checkWest(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
    if (x >= 0 && z > 0) {
      return checkNorth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
    }
    if (x < 0 && z > 0) {
      if (!worldData.chunks[chunkX - 16]) return false;
      if (!worldData.chunks[chunkX - 16][chunkZ + 16]) return false;
      const northWestChunk = worldData.chunks[chunkX - 16][chunkZ + 16];
      if (!northWestChunk) return false;
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
      return checkEast(worldData, chunkX, chunkZ, blockY, blockZ, y, z);
    }
    if (x <= 0 && z > 0) {
      return checkNorth(worldData, chunkX, chunkZ, blockX, blockY, x, y);
    }
    if (x > 0 && z > 0) {
      if (!worldData.chunks[chunkX + 16]) return false;
      if (!worldData.chunks[chunkX + 16][chunkZ + 16]) return false;
      const northEastChunk = worldData.chunks[chunkX + 16][chunkZ + 16];
      if (!northEastChunk) return false;
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
  chunkZ: number,
  blockX: number,
  blockY: number,
  x: number,
  y: number
) => {
  if (!worldData.chunks[chunkX]) return false;
  if (!worldData.chunks[chunkX][chunkZ + 16]) return false;
  const northChunk = worldData.chunks[chunkX][chunkZ + 16];
  if (!northChunk) return false;
  if (
    northChunk[blockX + x] &&
    northChunk[blockX + x][0] &&
    northChunk[blockX + x][0][blockY + y] !== undefined
  ) {
    return 1;
  }
  return false;
};
const checkSouth = (
  worldData: WorldData,
  chunkX: number,
  chunkZ: number,
  blockX: number,
  blockY: number,
  x: number,
  y: number
) => {
  if (!worldData.chunks[chunkX]) return false;
  if (!worldData.chunks[chunkX][chunkZ - 16]) return false;
  const southChunk = worldData.chunks[chunkX][chunkZ - 16];
  if (!southChunk) return false;
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
  chunkZ: number,
  blockY: number,
  blockZ: number,
  y: number,
  z: number
) => {
  if (!worldData.chunks[chunkX + 16]) return false;
  const eastChunk = worldData.chunks[chunkX + 16][chunkZ];
  if (!eastChunk) return false;
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
  chunkZ: number,
  blockY: number,
  blockZ: number,
  y: number,
  z: number
) => {
  if (!worldData.chunks[chunkX - 16]) return false;
  const westChunk = worldData.chunks[chunkX - 16][chunkZ];
  if (!westChunk) return false;
  if (
    westChunk[15] &&
    westChunk[15][blockZ + z] &&
    westChunk[15][blockZ + z][blockY + y] !== undefined
  ) {
    return westChunk[15][blockZ + z][blockY + y];
  }
  return false;
};
