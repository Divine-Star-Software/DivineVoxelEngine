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
                let add = (Math.random() * 2) >> 0;
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (y > baseY + 5 &&
                        y <= baseY + 6 + add &&
                        (z == 0 || x == 0 || z == 15 || x == 15)) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    },
};
