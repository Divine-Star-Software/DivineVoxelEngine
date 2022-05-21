import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunkX, chunkZ) {
        let baseY = 0;
        let maxY = 31;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y > baseY && y <= maxY) {
                        DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", x + chunkX, y, z + chunkZ);
                    }
                    if (y == baseY) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", x + chunkX, y, z + chunkZ);
                    }
                }
            }
        }
    },
};
