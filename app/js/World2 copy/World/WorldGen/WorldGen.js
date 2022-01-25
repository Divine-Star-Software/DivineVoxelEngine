export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkZ, type = "default") {
        let debugBox = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:debugbox:defualt");
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamstone:defualt");
        let dreamStonePillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamstonepillar:defualt");
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        const returnChunk = [];
        if (type == "pillar") {
            let pillarBlock = [dreamStonePillar, 1, 1];
            let baseBlock = [dreamstone, 1, 1];
            let baseY = 31;
            let topY = 50;
            let hole = false;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                        if (y == topY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = pillarBlock;
                        }
                        if (y >= baseY && y < topY) {
                            if (x % 15 == 0 || z % 15 == 0) {
                                if (x > 0) {
                                    if (x % 2 == 0)
                                        continue;
                                }
                                if (z > 0) {
                                    if (z % 2 == 0)
                                        continue;
                                }
                                returnChunk[x] ??= [];
                                returnChunk[x][z] ??= [];
                                returnChunk[x][z][y] = pillarBlock;
                            }
                        }
                    }
                }
            }
        }
        if (type == "default") {
            let topBlock = [dreamstone, 1, 1];
            let baseBlock = [dreamStonePillar, 1, 1];
            let topY = 31;
            let groundY = 31;
            let hole = false;
            if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
                topY = 42;
                hole = true;
            }
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (hole) {
                            if (y > 30 && y <= topY - 4) {
                                if (x > 4 && x < 10) {
                                    continue;
                                }
                                if (z > 4 && z < 10) {
                                    continue;
                                }
                            }
                        }
                        if (y < groundY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                            continue;
                        }
                        if (hole) {
                            if (y < topY) {
                                returnChunk[x] ??= [];
                                returnChunk[x][z] ??= [];
                                returnChunk[x][z][y] = topBlock;
                            }
                        }
                    }
                }
            }
            returnChunk[7][7][topY] = [debugBox, 1, 1];
            returnChunk[7][7][topY + 1] = [debugBox, 1, 1];
            returnChunk[7][7][topY + 2] = [debugBox, 1, 1];
            returnChunk[7][7][topY + 3] = [debugBox, 1, 1];
            returnChunk[0][0][topY] = [dreamstone, 1, 1];
            returnChunk[0][15][topY] = [dreamstone, 1, 1];
            returnChunk[15][15][topY] = [dreamstone, 1, 1];
            returnChunk[15][0][topY] = [dreamstone, 1, 1];
        }
        return {
            voxels: returnChunk,
        };
    }
}
