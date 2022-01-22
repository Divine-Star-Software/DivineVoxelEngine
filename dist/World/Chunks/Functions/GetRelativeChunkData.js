export function GetRealtiveChunkData(worldData, chunk, chunkX, chunkZ, voxelX, voxelY, voxelZ, x, y, z) {
    if (voxelX > 0 && voxelZ > 0 && voxelX < 15 && voxelZ < 15) {
        return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
    }
    if (voxelX == 0 && voxelZ > 0 && voxelZ < 15) {
        if (x >= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
        if (x < 0) {
            return checkWest(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
    }
    if (voxelX == 15 && voxelZ < 15 && voxelZ > 0) {
        if (x > 0) {
            return checkEast(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
        if (x <= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
    }
    if (voxelZ == 0 && voxelX > 0 && voxelX < 15) {
        if (z < 0) {
            return checkSouth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (z >= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
    }
    if (voxelZ == 15 && voxelX < 15 && voxelX > 0) {
        if (z > 0) {
            return checkNorth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (z <= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
    }
    //bottom left corner south west
    if (voxelX == 0 && voxelZ == 0) {
        if (x >= 0 && z >= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
        if (x < 0 && z >= 0) {
            return checkWest(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
        if (x >= 0 && z < 0) {
            return checkSouth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (x < 0 && z < 0) {
            if (!worldData.chunks[chunkX - 16])
                return false;
            if (!worldData.chunks[chunkX - 16][chunkZ - 16])
                return false;
            const southWestChunk = worldData.chunks[chunkX - 16][chunkZ - 16];
            if (!southWestChunk)
                return false;
            if (southWestChunk[15] &&
                southWestChunk[15][15] &&
                southWestChunk[15][15][voxelY + y] !== undefined) {
                return southWestChunk[15][15][voxelY + y];
            }
        }
    }
    //bottom left corner south east
    if (voxelX == 15 && voxelZ == 0) {
        if (x <= 0 && z >= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
        if (x > 0 && z >= 0) {
            return checkEast(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
        if (x <= 0 && z < 0) {
            return checkSouth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (x > 0 && z < 0) {
            if (!worldData.chunks[chunkX + 16])
                return false;
            if (!worldData.chunks[chunkX + 16][chunkZ - 16])
                return false;
            const southEastChunk = worldData.chunks[chunkX + 16][chunkZ - 16];
            if (!southEastChunk)
                return false;
            if (southEastChunk[0] &&
                southEastChunk[0][15] &&
                southEastChunk[0][15][voxelY + y] !== undefined) {
                return southEastChunk[0][15][voxelY + y];
            }
        }
    }
    //top left corner north west
    if (voxelX == 0 && voxelZ == 15) {
        if (x >= 0 && z <= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
        if (x < 0 && z <= 0) {
            return checkWest(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
        if (x >= 0 && z > 0) {
            return checkNorth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (x < 0 && z > 0) {
            if (!worldData.chunks[chunkX - 16])
                return false;
            if (!worldData.chunks[chunkX - 16][chunkZ + 16])
                return false;
            const northWestChunk = worldData.chunks[chunkX - 16][chunkZ + 16];
            if (!northWestChunk)
                return false;
            if (northWestChunk[15] &&
                northWestChunk[15][0] &&
                northWestChunk[15][0][voxelY + y] !== undefined) {
                return northWestChunk[15][0][voxelY + y];
            }
        }
    }
    //top right corner north east
    if (voxelX == 15 && voxelZ == 15) {
        if (x <= 0 && z <= 0) {
            return checkNormal(chunk, voxelX, voxelY, voxelZ, x, y, z);
        }
        if (x > 0 && z <= 0) {
            return checkEast(worldData, chunkX, chunkZ, voxelY, voxelZ, y, z);
        }
        if (x <= 0 && z > 0) {
            return checkNorth(worldData, chunkX, chunkZ, voxelX, voxelY, x, y);
        }
        if (x > 0 && z > 0) {
            if (!worldData.chunks[chunkX + 16])
                return false;
            if (!worldData.chunks[chunkX + 16][chunkZ + 16])
                return false;
            const northEastChunk = worldData.chunks[chunkX + 16][chunkZ + 16];
            if (!northEastChunk)
                return false;
            if (northEastChunk[0] &&
                northEastChunk[0][0] &&
                northEastChunk[0][0][voxelY + y] !== undefined) {
                return northEastChunk[0][0][voxelY + y];
            }
        }
    }
    return false;
}
const checkNormal = (chunk, voxelX, voxelY, voxelZ, x, y, z) => {
    if (chunk[voxelX + x] &&
        chunk[voxelX + x][voxelZ + z] &&
        chunk[voxelX + x][voxelZ + z][voxelY + y] !== undefined) {
        return chunk[voxelX + x][voxelZ + z][voxelY + y];
    }
    return false;
};
const checkNorth = (worldData, chunkX, chunkZ, voxelX, voxelY, x, y) => {
    if (!worldData.chunks[chunkX])
        return false;
    if (!worldData.chunks[chunkX][chunkZ + 16])
        return false;
    const northChunk = worldData.chunks[chunkX][chunkZ + 16];
    if (!northChunk)
        return false;
    if (northChunk[voxelX + x] &&
        northChunk[voxelX + x][0] &&
        northChunk[voxelX + x][0][voxelY + y] !== undefined) {
        return 1;
    }
    return false;
};
const checkSouth = (worldData, chunkX, chunkZ, voxelX, voxelY, x, y) => {
    if (!worldData.chunks[chunkX])
        return false;
    if (!worldData.chunks[chunkX][chunkZ - 16])
        return false;
    const southChunk = worldData.chunks[chunkX][chunkZ - 16];
    if (!southChunk)
        return false;
    if (southChunk[voxelX + x] &&
        southChunk[voxelX + x][15] &&
        southChunk[voxelX + x][15][voxelY + y] !== undefined) {
        return southChunk[voxelX + x][15][voxelY + y];
    }
    return false;
};
const checkEast = (worldData, chunkX, chunkZ, voxelY, voxelZ, y, z) => {
    if (!worldData.chunks[chunkX + 16])
        return false;
    const eastChunk = worldData.chunks[chunkX + 16][chunkZ];
    if (!eastChunk)
        return false;
    if (eastChunk[0] &&
        eastChunk[0][voxelZ + z] &&
        eastChunk[0][voxelZ + z][voxelY + y] !== undefined) {
        return eastChunk[0][voxelZ + z][voxelY + y];
    }
    return false;
};
const checkWest = (worldData, chunkX, chunkZ, voxelY, voxelZ, y, z) => {
    if (!worldData.chunks[chunkX - 16])
        return false;
    const westChunk = worldData.chunks[chunkX - 16][chunkZ];
    if (!westChunk)
        return false;
    if (westChunk[15] &&
        westChunk[15][voxelZ + z] &&
        westChunk[15][voxelZ + z][voxelY + y] !== undefined) {
        return westChunk[15][voxelZ + z][voxelY + y];
    }
    return false;
};
