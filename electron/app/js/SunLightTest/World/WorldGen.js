import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunkX, chunkY, chunkZ) {
        let maxY = 126;
        let holeMade = false;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y == maxY / 2 && !holeMade) {
                        if (Math.random() < 0.02) {
                            holeMade = true;
                            continue;
                        }
                    }
                    if (y <= maxY / 2 - 5) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (y == maxY / 2) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    },
};
