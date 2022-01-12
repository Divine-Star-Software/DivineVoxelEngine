export function GetRealtiveChunkData(worldData, chunk, chunkX, chunkZ, blockX, blockY, blockZ, x, y, z) {
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
            if (!worldData.chunks[chunkX - 16])
                return false;
            if (!worldData.chunks[chunkX - 16][chunkZ - 16])
                return false;
            const southWestChunkData = worldData.chunks[chunkX - 16][chunkZ - 16];
            if (!southWestChunkData)
                return false;
            const southWestChunk = southWestChunkData.voxels;
            if (southWestChunk[15] &&
                southWestChunk[15][15] &&
                southWestChunk[15][15][blockY + y] !== undefined) {
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
            if (!worldData.chunks[chunkX + 16])
                return false;
            if (!worldData.chunks[chunkX + 16][chunkZ - 16])
                return false;
            const southEastChunkData = worldData.chunks[chunkX + 16][chunkZ - 16];
            if (!southEastChunkData)
                return false;
            const southEastChunk = southEastChunkData.voxels;
            if (southEastChunk[0] &&
                southEastChunk[0][15] &&
                southEastChunk[0][15][blockY + y] !== undefined) {
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
            if (!worldData.chunks[chunkX - 16])
                return false;
            if (!worldData.chunks[chunkX - 16][chunkZ + 16])
                return false;
            const northWestChunkData = worldData.chunks[chunkX - 16][chunkZ + 16];
            if (!northWestChunkData)
                return false;
            const northWestChunk = northWestChunkData.voxels;
            if (northWestChunk[15] &&
                northWestChunk[15][0] &&
                northWestChunk[15][0][blockY + y] !== undefined) {
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
            if (!worldData.chunks[chunkX + 16])
                return false;
            if (!worldData.chunks[chunkX + 16][chunkZ + 16])
                return false;
            const northEastChunkData = worldData.chunks[chunkX + 16][chunkZ + 16];
            if (!northEastChunkData)
                return false;
            const northEastChunk = northEastChunkData.voxels;
            if (northEastChunk[0] &&
                northEastChunk[0][0] &&
                northEastChunk[0][0][blockY + y] !== undefined) {
                return northEastChunk[0][0][blockY + y];
            }
        }
    }
    return false;
}
const checkNormal = (chunk, blockX, blockY, blockZ, x, y, z) => {
    if (chunk[blockX + x] &&
        chunk[blockX + x][blockZ + z] &&
        chunk[blockX + x][blockZ + z][blockY + y] !== undefined) {
        return chunk[blockX + x][blockZ + z][blockY + y];
    }
    return false;
};
const checkNorth = (worldData, chunkX, chunkZ, blockX, blockY, x, y) => {
    if (!worldData.chunks[chunkX])
        return false;
    if (!worldData.chunks[chunkX][chunkZ + 16])
        return false;
    const northChunkData = worldData.chunks[chunkX][chunkZ + 16];
    if (!northChunkData)
        return false;
    const northChunk = northChunkData.voxels;
    if (northChunk[blockX + x] &&
        northChunk[blockX + x][0] &&
        northChunk[blockX + x][0][blockY + y] !== undefined) {
        return 1;
    }
    return false;
};
const checkSouth = (worldData, chunkX, chunkZ, blockX, blockY, x, y) => {
    if (!worldData.chunks[chunkX])
        return false;
    if (!worldData.chunks[chunkX][chunkZ - 16])
        return false;
    const southChunkData = worldData.chunks[chunkX][chunkZ - 16];
    if (!southChunkData)
        return false;
    const southChunk = southChunkData.voxels;
    if (southChunk[blockX + x] &&
        southChunk[blockX + x][15] &&
        southChunk[blockX + x][15][blockY + y] !== undefined) {
        return southChunk[blockX + x][15][blockY + y];
    }
    return false;
};
const checkEast = (worldData, chunkX, chunkZ, blockY, blockZ, y, z) => {
    if (!worldData.chunks[chunkX + 16])
        return false;
    const eastChunkData = worldData.chunks[chunkX + 16][chunkZ];
    if (!eastChunkData)
        return false;
    const eastChunk = eastChunkData.voxels;
    if (eastChunk[0] &&
        eastChunk[0][blockZ + z] &&
        eastChunk[0][blockZ + z][blockY + y] !== undefined) {
        return eastChunk[0][blockZ + z][blockY + y];
    }
    return false;
};
const checkWest = (worldData, chunkX, chunkZ, blockY, blockZ, y, z) => {
    if (!worldData.chunks[chunkX - 16])
        return false;
    const westChunkData = worldData.chunks[chunkX - 16][chunkZ];
    if (!westChunkData)
        return false;
    const westChunk = westChunkData.voxels;
    if (westChunk[15] &&
        westChunk[15][blockZ + z] &&
        westChunk[15][blockZ + z][blockY + y] !== undefined) {
        return westChunk[15][blockZ + z][blockY + y];
    }
    return false;
};
