import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateNormalChunk(chunkX, chunkY, chunkZ) {
        let maxY = (64 + Math.random() * 5) >> 0;
        let holeMade = false;
        let hole = false;
        let noHole = Math.random() > 0.2;
        let add = Math.random() > 0.5 ? -1 : 1;
        let spaceHeight = (15 + Math.random() * 3 * add) >> 0;
        let lampMax = 5;
        let currentLamp = 0;
        // let noHole = true;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                hole = false;
                if (Math.random() > 0.9 && !holeMade && !noHole) {
                    hole = true;
                    holeMade = true;
                }
                let addLamp = false;
                let flip = Math.random();
                if (flip > 0.5 && flip < 0.55 && currentLamp < lampMax) {
                    addLamp = true;
                    currentLamp++;
                }
                let spikeHeight = (2 + Math.random() * 3) >> 0;
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y >= maxY - 20 - spaceHeight && y <= maxY + 6 && hole) {
                        continue;
                    }
                    let tx = x + chunkX;
                    let ty = y + chunkY;
                    let tz = z + chunkZ;
                    if (y <= maxY - spaceHeight - 25) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y <= maxY - spaceHeight - 15) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y == maxY - spaceHeight - 10) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y <= maxY - spaceHeight && y >= maxY - 10) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y == maxY - 10 - spaceHeight) {
                        if (Math.random() > 0.9) {
                            DVEW.worldData.paintVoxel("dve:dreamgrass", "default", tx, ty + 1, tz);
                        }
                        if (addLamp) {
                            DVEW.worldData.paintVoxel("dve:dreamlamp", "default", tx, ty, tz);
                        }
                    }
                    if (y == maxY + add * spaceHeight + spikeHeight + 1) {
                        if (Math.random() > 0.9) {
                            DVEW.worldData.paintVoxel("dve:dreamgrass", "default", tx, ty, tz);
                        }
                        else {
                            if (Math.random() > 0.98) {
                                DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", tx, ty, tz);
                            }
                        }
                    }
                    if (y >= maxY + add * spaceHeight - spikeHeight &&
                        y <= spikeHeight + maxY + add * spaceHeight) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", tx, ty, tz);
                    }
                }
            }
        }
    },
    generatePondChunk(chunkX, chunkY, chunkZ) {
        let maxY = 30;
        let spaceHeight = (10 + Math.random() * 3) >> 0;
        let add = Math.random() > 0.5 ? -1 : 1;
        // let noHole = true;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                let spikeHeight = (2 + Math.random() * 3) >> 0;
                for (let y = 0; y < maxY; y++) {
                    let tx = x + chunkX;
                    let ty = y + chunkY;
                    let tz = z + chunkZ;
                    if (y <= maxY - spaceHeight + 1) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y > maxY - spaceHeight && y <= maxY - spaceHeight + spikeHeight) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", tx, ty, tz);
                    }
                    if (y <= maxY && y >= maxY - spaceHeight + spikeHeight) {
                        DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", tx, ty, tz);
                    }
                }
            }
        }
    },
    generateChunk(chunkX, chunkY, chunkZ) {
        let test = Math.random();
        if (test <= 0.8) {
            this.generateNormalChunk(chunkX, chunkY, chunkZ);
        }
        else {
            this.generatePondChunk(chunkX, chunkY, chunkZ);
        }
    },
};
