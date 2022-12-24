import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        brush.start().setId("dve_dreamstone");
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 20; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < 5) {
                        brush.paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
