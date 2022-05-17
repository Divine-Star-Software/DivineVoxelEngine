export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 128;
    renderDistance = 20;
    _3dArray;
    generateChunk(chunkX, chunkZ, type = "default") {
        if (type == "pillar") {
            let baseY = 31;
            let topY = 50;
            for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
                for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, y, z);
                        }
                        if (y == topY) {
                            this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x, y, z);
                        }
                        if (y >= baseY && y < topY) {
                            if (x == chunkX + 15 ||
                                z == chunkZ + 15 ||
                                x == chunkX + 1 ||
                                z == chunkZ + 1) {
                                if (x % 2 == 0)
                                    continue;
                                if (z % 2 == 0)
                                    continue;
                                this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x, y, z);
                            }
                        }
                    }
                }
            }
        }
        if (type == "default") {
            let topY = 31;
            let groundY = 31;
            let hole = false;
            if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
                topY = 42;
                hole = true;
            }
            for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
                for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
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
                            this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x, y, z);
                            continue;
                        }
                        if (hole) {
                            if (y < topY) {
                                this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, y, z);
                            }
                        }
                    }
                }
            }
            if (!hole) {
                this.DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", chunkX + 7, topY, chunkZ + 7);
                this.DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", chunkX + 7, topY, chunkZ + 8);
                this.DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", chunkX + 6, topY, chunkZ + 9);
                this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", chunkX + 7, topY, chunkZ + 9);
            }
        }
    }
}
