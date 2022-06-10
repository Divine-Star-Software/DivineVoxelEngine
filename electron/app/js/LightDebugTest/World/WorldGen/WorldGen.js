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
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (x == 7 && z == 7 && y == baseY + 10) {
                        continue;
                    }
                    if (y <= baseY + 3 || y == baseY + 10) {
                        DVEW.worldData.paintVoxel("dve:lightdebug", "default", x + chunkX, y + chunkY, z + chunkZ);
                        /*       DVEW.worldData.paintVoxel(
                         "dve:dreamstone",
                         "default",
                         x + chunkX,
                         y + chunkY,
                         z + chunkZ
                        ); */
                    }
                    if (y == baseY + 6) {
                        /*       DVEW.worldData.paintVoxel(
                         "dve:dreamgrass",
                         "default",
                         x + chunkX,
                         y + chunkY,
                         z + chunkZ
                        ); */
                    }
                }
            }
        }
    },
};
