import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generatePondChunk(chunkX, chunkZ) {
        let baseY = 30;
        let topY = 50;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY - 1) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
                    }
                    if (y > baseY - 1 && y < baseY + 1) {
                        DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, x, y, z);
                    }
                    if (y <= baseY + 2 && baseY >= baseY) {
                        if (x == chunkX + 15 || z == chunkZ + 15 || x == chunkX || z == chunkZ) {
                            DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                        }
                    }
                    if (y <= baseY + 1 && baseY >= baseY) {
                        if ((z == chunkZ + 7 && x == chunkX + 7) ||
                            (z == chunkZ + 8 && x == chunkX + 8) ||
                            (z == chunkZ + 7 && x == chunkX + 8) ||
                            (z == chunkZ + 8 && x == chunkX + 7) ||
                            (z == chunkZ + 11 && x == chunkX + 7) ||
                            (z == chunkZ + 5 && x == chunkX + 7) ||
                            //corners
                            //=======
                            (z == chunkZ + 13 && x == chunkX + 13) ||
                            (z == chunkZ + 14 && x == chunkX + 13) ||
                            (z == chunkZ + 13 && x == chunkX + 14) ||
                            //=======
                            (z == chunkZ + 2 && x == chunkX + 1) ||
                            (z == chunkZ + 2 && x == chunkX + 2) ||
                            (z == chunkZ + 1 && x == chunkX + 2) ||
                            //=======
                            (z == chunkZ + 13 && x == chunkX + 1) ||
                            (z == chunkZ + 14 && x == chunkX + 2) ||
                            (z == chunkZ + 13 && x == chunkX + 2) ||
                            //=======
                            (z == chunkZ + 2 && x == chunkX + 14) ||
                            (z == chunkZ + 2 && x == chunkX + 13) ||
                            (z == chunkZ + 1 && x == chunkX + 13)) {
                            DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                        }
                    }
                }
            }
        }
    },
    generatePillarChunk(chunkX, chunkZ) {
        let baseY = 31;
        let topY = 50;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y < baseY) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
                    }
                    if (y == topY) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                    }
                    if (y >= baseY && y < topY) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                    }
                }
            }
        }
    },
    generateDefaultChunk(chunkX, chunkZ) {
        let topY = 31;
        let groundY = 31;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y < groundY) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                        continue;
                    }
                    let flip = Math.random();
                    if (flip >= 0.1) {
                        continue;
                    }
                    if (flip <= 0.01) {
                        DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", 0, x, topY, z);
                        continue;
                    }
                    if (flip >= 0.01 && flip <= 0.02) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, topY, z);
                        let flip2 = Math.random();
                        if (flip2 < 0.01) {
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 1, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 2, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 3, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 4, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 4, z + 1);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 4, z - 1);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x + 1, topY + 4, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x - 1, topY + 4, z);
                            DVEW.worldData.paintVoxel("dve:dreamgrassblock", "default", 0, x, topY + 5, z);
                        }
                        continue;
                    }
                    if (flip >= 0.02 && flip <= 0.03) {
                        DVEW.worldData.paintVoxel("dve:dreamgrass", "default", 0, x, topY, z);
                        continue;
                    }
                }
            }
        }
    },
    generateChunk(chunkX, chunkZ, type = "default") {
        if (type == "pillar") {
            this.generatePillarChunk(chunkX, chunkZ);
        }
        if (type == "pond") {
            this.generatePondChunk(chunkX, chunkZ);
        }
        if (type == "default") {
            this.generateDefaultChunk(chunkX, chunkZ);
        }
    },
};
