import { DVEC } from "../../../../out/Constructor/DivineVoxelEngineConstructor.js";
const brush = DVEC.worldGen.getBrush();
export const WorldGen = {
    generate(dimension, chunkX, y, chunkZ, data) {
        brush.setId("dve_dreamstone");
        brush.start();
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 18; y++) {
                    brush.setXYZ(x, y, z);
                    if (y == 5 && Math.random() > 0.98) {
                        brush.setId("dve_dreamgrass").paint();
                        continue;
                    }
                    if (y == 5 && Math.random() > 0.98) {
                        brush.setId("dve_dreamlamp").paint();
                        continue;
                    }
                    if (y == 5 && Math.random() > 0.98) {
                        brush.setId("dve_liquiddreamether").paint();
                        continue;
                    }
                    if (y < 5) {
                        brush.setId("dve_dreamstone").paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
