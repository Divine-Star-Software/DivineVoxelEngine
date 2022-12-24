import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateChunk(chunkX, chunkZ) {
        brush.start();
        let groundY = 31;
        let maxY = 64;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < groundY - 1 || (y == 60 && Math.random() > 0.5)) {
                        brush.setId("dve_dreamstone").paint();
                    }
                    if (y == groundY - 1) {
                        brush.setId("dve_liquiddreamether").paint();
                    }
                    if (y >= groundY && y <= maxY) {
                        if (x % 7 == 0 && z % 7 == 0) {
                            if (y == groundY) {
                                brush.setId("dve_dreamstone").paint();
                            }
                            else {
                                brush.setId("dve_dreamstone").paint();
                            }
                        }
                    }
                }
            }
        }
        brush.stop();
    },
};
