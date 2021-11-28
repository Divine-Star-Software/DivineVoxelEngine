import type { WorldData } from "Core/Contexts/WorldData/WorldData";

export function ChunkOcculsionCalcuation(
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
    if (!chunk[blockX + x]) {
      return 1;
    }
    if (!chunk[blockX + x][blockZ + z]) {
      return 1;
    }
    if (!chunk[blockX + x][blockZ + z][blockY + y]) {
      return 1;
    }
  }
  if (blockX == 0 && blockZ > 0 && blockZ < 15) {
    if (x >= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x < 0) {
      if (!worldData.chunks[chunkX - 16]) return 1;
      const westChunk = worldData.chunks[chunkX - 16][chunkZ];
      if (!westChunk) return 1;
      if (!westChunk[15]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z][blockY + y]) {
        return 1;
      }
    }
  }
  if (blockX == 15 && blockZ < 15 && blockZ > 0) {
    if (x > 0) {
      if (!worldData.chunks[chunkX + 16]) return 1;
      const eastChunk = worldData.chunks[chunkX + 16][chunkZ];
      if (!eastChunk) return 1;
      if (!eastChunk[0]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x <= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }
  }

  if (blockZ == 0 && blockX > 0 && blockX < 15) {
    if (z < 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ - 16]) return 1;
      const southChunk = worldData.chunks[chunkX][chunkZ - 16];
      if (!southChunk) return 1;
      if (!southChunk[blockX + x]) {
        return 1;
      }
      if (!southChunk[blockX + x][15]) {
        return 1;
      }
      if (!southChunk[blockX + x][15][blockY + y]) {
        return 1;
      }
    }
    if (z >= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }
  }

  if (blockZ == 15 && blockX < 15 && blockX > 0) {
    if (z > 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ + 16]) return 1;
      const northChunk = worldData.chunks[chunkX][chunkZ + 16];
      if (!northChunk) return 1;
      if (!northChunk[blockX + x]) {
        return 1;
      }
      if (!northChunk[blockX + x][0]) {
        return 1;
      }
      if (!northChunk[blockX + x][0][blockY + y]) {
        return 1;
      }
    }
    if (z <= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }
  }

  //bottom left corner south west
  if (blockX == 0 && blockZ == 0) {
    if (x >= 0 && z >= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }

    if (x < 0 && z >= 0) {
      if (!worldData.chunks[chunkX - 16]) return 1;
      const westChunk = worldData.chunks[chunkX - 16][chunkZ];
      if (!westChunk) return 1;
      if (!westChunk[15]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x >= 0 && z < 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ - 16]) return 1;
      const southChunk = worldData.chunks[chunkX][chunkZ - 16];
      if (!southChunk) return 1;
      if (!southChunk[blockX + x]) {
        return 1;
      }
      if (!southChunk[blockX + x][15]) {
        return 1;
      }
      if (!southChunk[blockX + x][15][blockY + y]) {
        return 1;
      }
    }
    if (x < 0 && z < 0) {
      if (!worldData.chunks[chunkX - 16]) return 1;
      if (!worldData.chunks[chunkX - 16][chunkZ - 16]) return 1;
      const southWestChunk = worldData.chunks[chunkX - 16][chunkZ - 16];
      if (!southWestChunk) return 1;
      if (!southWestChunk[15]) {
        return 1;
      }
      if (!southWestChunk[15][15]) {
        return 1;
      }
      if (!southWestChunk[15][15][blockY + y]) {
        return 1;
      }
    }
  }

  //bottom left corner south east
  if (blockX == 15 && blockZ == 0) {
    if (x <= 0 && z >= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }

    if (x > 0 && z >= 0) {
      if (!worldData.chunks[chunkX + 16]) return 1;
      const eastChunk = worldData.chunks[chunkX + 16][chunkZ];
      if (!eastChunk) return 1;

      if (!eastChunk[0]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x <= 0 && z < 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ - 16]) return 1;
      const southChunk = worldData.chunks[chunkX][chunkZ - 16];
      if (!southChunk) return 1;
      if (!southChunk[blockX + x]) {
        return 1;
      }
      if (!southChunk[blockX + x][15]) {
        return 1;
      }
      if (!southChunk[blockX + x][15][blockY + y]) {
        return 1;
      }
    }

    if (x > 0 && z < 0) {
      if (!worldData.chunks[chunkX + 16]) return 1;
      if (!worldData.chunks[chunkX + 16][chunkZ - 16]) return 1;
      const southEastChunk = worldData.chunks[chunkX + 16][chunkZ - 16];
      if (!southEastChunk) return 1;
      if (!southEastChunk[0]) {
        return 1;
      }
      if (!southEastChunk[0][15]) {
        return 1;
      }
      if (!southEastChunk[0][15][blockY + y]) {
        return 1;
      }
    }
  }

  //top left corner north west
  if (blockX == 0 && blockZ == 15) {
    if (x >= 0 && z <= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }

    if (x < 0 && z <= 0) {
      if (!worldData.chunks[chunkX - 16]) return 1;
      const westChunk = worldData.chunks[chunkX - 16][chunkZ];
      if (!westChunk) return 1;
      if (!westChunk[15]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z]) {
        return 1;
      }
      if (!westChunk[15][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x >= 0 && z > 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ + 16]) return 1;
      const northChunk = worldData.chunks[chunkX][chunkZ + 16];
      if (!northChunk) return 1;
      if (!northChunk[blockX + x]) {
        return 1;
      }
      if (!northChunk[blockX + x][0]) {
        return 1;
      }
      if (!northChunk[blockX + x][0][blockY + y]) {
        return 1;
      }
    }

    if (x < 0 && z > 0) {
      if (!worldData.chunks[chunkX - 16]) return 1;
      if (!worldData.chunks[chunkX - 16][chunkZ + 16]) return 1;
      const northWestChunk = worldData.chunks[chunkX - 16][chunkZ + 16];
      if (!northWestChunk) return 1;
      if (!northWestChunk[15]) {
        return 1;
      }
      if (!northWestChunk[15][0]) {
        return 1;
      }
      if (!northWestChunk[15][0][blockY + y]) {
        return 1;
      }
    }
  }

  //top right corner north east
  if (blockX == 15 && blockZ == 15) {
    if (x <= 0 && z <= 0) {
      if (!chunk[blockX + x]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z]) {
        return 1;
      }
      if (!chunk[blockX + x][blockZ + z][blockY + y]) {
        return 1;
      }
    }

    if (x > 0 && z <= 0) {
      if (!worldData.chunks[chunkX + 16]) return 1;
      const eastChunk = worldData.chunks[chunkX + 16][chunkZ];
      if (!eastChunk) return 1;
      if (!eastChunk[0]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z]) {
        return 1;
      }
      if (!eastChunk[0][blockZ + z][blockY + y]) {
        return 1;
      }
    }
    if (x <= 0 && z > 0) {
      if (!worldData.chunks[chunkX]) return 1;
      if (!worldData.chunks[chunkX][chunkZ + 16]) return 1;
      const northChunk = worldData.chunks[chunkX][chunkZ + 16];
      if (!northChunk) return 1;
      if (!northChunk[blockX + x]) {
        return 1;
      }
      if (!northChunk[blockX + x][0]) {
        return 1;
      }
      if (!northChunk[blockX + x][0][blockY + y]) {
        return 1;
      }
    }
    if (x > 0 && z > 0) {
      if (!worldData.chunks[chunkX + 16]) return 1;
      if (!worldData.chunks[chunkX + 16][chunkZ + 16]) return 1;
      const northEastChunk = worldData.chunks[chunkX + 16][chunkZ + 16];
      if (!northEastChunk) return 1;
      if (!northEastChunk[0]) {
        return 1;
      }
      if (!northEastChunk[0][0]) {
        return 1;
      }
      if (!northEastChunk[0][0][blockY + y]) {
        return 1;
      }
    }
  }
  return 0.75;
}
