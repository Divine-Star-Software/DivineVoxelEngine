import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        let baseY = 0;
        brush.start();
        for (let x = chunkX; x < chunkX + 16; x++) {
            for (let z = 0; z < chunkZ + 16; z++) {
                let add = (Math.random() * 4) >> 0;
                let middlePillar = Math.random() > 0.8;
                let airPillar = Math.random() > 0.9;
                let voxelFlip = Math.random() > 0.5;
                let voxel = "dve_dreamstone";
                if (voxelFlip) {
                    voxel = "dve_dreamstonepillar";
                }
                for (let y = 0; y < 50; y++) {
                    brush.setXYZ(x, y, z);
                    if (y <= baseY + 5) {
                        brush.setId("dve_dreamstone").paint();
                    }
                    if (airPillar && y > baseY + 10 && y <= baseY + 10 + add) {
                        brush.setId(voxel).paint();
                    }
                    if (y > baseY + 5 &&
                        y <= baseY + 6 + add &&
                        (z == 0 || x == 0 || z == 15 || x == 15)) {
                        brush.setId(voxel).paint();
                        continue;
                    }
                    if (middlePillar &&
                        y > baseY + 5 &&
                        y <= baseY + 6 + add * 1.5 &&
                        !(z == 0 || x == 0 || z == 15 || x == 15)) {
                        brush.setId(voxel).paint();
                        continue;
                    }
                    if (y == baseY + 6) {
                        let flip = Math.random() > 0.7;
                        if (flip) {
                            brush.setId("dve_dreamgrass").paint();
                        }
                    }
                }
            }
        }
        brush.stop();
    },
};
