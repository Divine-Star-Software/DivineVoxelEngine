import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateChunk(chunkX, chunkZ) {
        let topY = 31;
        let groundY = 31;
        let maxY = 64;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y < groundY) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                    }
                    if (y >= groundY && y <= maxY) {
                        if (x % 7 == 0 && z % 7 == 0) {
                            DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                        }
                    }
                }
            }
        }
    },
};
