import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(dimesnion, chunkX, chunkZ) {
        brush.setDimension(dimesnion);
        if (dimesnion == "main") {
            brush.setId("dve_dreamstone");
        }
        if (dimesnion == "other") {
            brush.setId("dve_dreadstone");
        }
        brush.start();
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 18; y++) {
                    brush.setXYZ(x, y, z);
                    if (y == 5 && Math.random() > 0.98) {
                        brush.setId("dve_dreamgrass").setShapeState(0).paint();
                    }
                    if (y < 5) {
                        if (dimesnion == "main") {
                            brush.setId("dve_dreamstone");
                        }
                        if (dimesnion == "other") {
                            brush.setId("dve_dreadstone");
                        }
                        brush.paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
