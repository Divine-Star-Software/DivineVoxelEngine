import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkY, chunkZ) {
        brush.setId("dve_dreamstonepillar").start();
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = chunkY; y < 20; y++) {
                    if (y <= 15) {
                        brush.setXYZ(x, y, z).paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
