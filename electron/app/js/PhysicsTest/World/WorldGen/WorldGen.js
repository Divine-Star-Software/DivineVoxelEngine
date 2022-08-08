import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    _3dArray: DVEW.UTIL.getFlat3DArray(),
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunkX, chunkY, chunkZ) {
        let baseY = 0;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                let add = (Math.random() * 4) >> 0;
                let middlePillar = Math.random() > 0.8;
                let airPillar = Math.random() > 0.9;
                let voxelFlip = Math.random() > 0.5;
                let voxel = "dve:dreamstone";
                if (voxelFlip) {
                    voxel = "dve:dreamstonepillar";
                }
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (airPillar && y > baseY + 10 && y <= baseY + 10 + add) {
                        DVEW.worldData.paintVoxel(voxel, 0, 0, x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (y > baseY + 5 &&
                        y <= baseY + 6 + add &&
                        (z == 0 || x == 0 || z == 15 || x == 15)) {
                        DVEW.worldData.paintVoxel(voxel, 0, 0, x + chunkX, y + chunkY, z + chunkZ);
                        continue;
                    }
                    if (middlePillar &&
                        y > baseY + 5 &&
                        y <= baseY + 6 + add * 1.5 &&
                        !(z == 0 || x == 0 || z == 15 || x == 15)) {
                        DVEW.worldData.paintVoxel(voxel, 0, 0, x + chunkX, y + chunkY, z + chunkZ);
                        continue;
                    }
                    if (y == baseY + 6) {
                        let flip = Math.random() > 0.7;
                        if (flip) {
                            DVEW.worldData.paintVoxel("dve:dreamgrass", 0, 0, x + chunkX, y + chunkY, z + chunkZ);
                        }
                    }
                }
            }
        }
    },
};
