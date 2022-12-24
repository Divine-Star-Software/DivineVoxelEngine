import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkY, chunkZ, type) {
        brush.start();
        let baseY = 10;
        let maxY = 61;
        let fill = false;
        let heightChange = false;
        let height = 0;
        for (let x = chunkX; x < chunkX + 16; x++) {
            for (let z = chunkZ; z < chunkZ + 16; z++) {
                if (Math.random() < 0.3) {
                    fill = true;
                }
                else {
                    fill = false;
                }
                if (Math.random() < 0.5) {
                    heightChange = true;
                }
                else {
                    heightChange = false;
                }
                if (heightChange) {
                    height = Math.random() * 3;
                }
                else {
                    height = 0;
                }
                for (let y = 0; y < 80; y++) {
                    brush.setXYZ(x, y, z);
                    if (type == "track") {
                        if (!fill) {
                            if (y <= baseY + height && x >= 6 && x <= 9) {
                                brush.setId("dve_dreamstonepillar").paint();
                                if (y == baseY + height && Math.random() < 0.5) {
                                    brush.setId("dve_dreamlamp").paint();
                                }
                            }
                            if (y <= baseY - 5) {
                                brush.setId("dve_dreamstonepillar").paint();
                            }
                            if (y >= baseY - 5 && y <= baseY - 1 && (x < 6 || x > 9)) {
                                brush.setId("dve_liquiddreamether").paint();
                            }
                        }
                        else {
                            if (y <= baseY - 5) {
                                brush.setId("dve_dreamstonepillar").paint();
                            }
                            if (y >= baseY - 5 && y <= baseY - 1) {
                                brush.setId("dve_liquiddreamether").paint();
                            }
                        }
                    }
                    if (type == "trench") {
                        if (y <= baseY - 5) {
                            brush.setId("dve_dreamstonepillar").paint();
                        }
                        if (y >= baseY - 5 && y <= baseY - 1) {
                            brush.setId("dve_liquiddreamether").paint();
                        }
                    }
                    if (type == "wall") {
                        if (y <= maxY) {
                            brush.setId("dve_dreamstone").paint();
                        }
                    }
                }
            }
        }
        brush.stop();
    },
};
