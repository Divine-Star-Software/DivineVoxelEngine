import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 128; y++) {
                    if ((z % 2 == 0 && x % 2 == 0) || y % 2 == 0) {
                        brush.setId("dve_dreamstonepillar").setXYZ(x, y, z).paint();
                    }
                }
            }
        }
    },
};
