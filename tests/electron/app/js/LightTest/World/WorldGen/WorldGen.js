import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunkX, chunkY, chunkZ) {
        let baseY = 60;
        brush.start();
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    brush.setXYZ(x + chunkX, y + chunkY, z + chunkZ);
                    if (y <= baseY + 5) {
                        brush.setId("dve_dreadstonepillar").paint();
                    }
                    if (y == baseY + 5 && x == 1 && z == 1) {
                        brush.setId("dve_dreadlamp").paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
