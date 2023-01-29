import { VoxelMath } from "../../../../out/Math/VoxelMath.js";
import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
import { GenerateTemple } from "./Functions/GenerateTemple.js";
import { GenerateStairChunk } from "./Functions/StairChunks.js";
const brush = DVEW.getBrush();
const dataTool = DVEW.getDataTool();
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateStairChunk: GenerateStairChunk,
    generateTemplate: GenerateTemple,
    _treeLeafs: [
        [0, 4, 1],
        [0, 4, -1],
        [1, 4, 0],
        [-1, 4, 0],
        [0, 4, 2],
        [0, 4, -2],
        [2, 4, 0],
        [-2, 4, 0],
        [1, 4, +1],
        [1, 4, 1],
        [1, 4, +1],
        [1, 4, 1],
        [-1, 4, 1],
        [-1, 4, -1],
        [0, 5, 1],
        [0, 5, -1],
        [1, 5, 0],
        [-1, 5, 0],
        [0, 5, 0],
        [0, 6, 0],
    ],
    generateTree(x, y, z) {
        brush.setId("dve_dream-log");
        let height = (30 * Math.random()) >> 0;
        height < 5 ? (height += 5) : true;
        for (let i = 0; i < height; i++) {
            brush.setXYZ(x, y + i, z).paint();
        }
        let k = 5;
        for (let iy = height - 4; iy <= height + 1; iy++) {
            this.generateCircle("dve_dream-leafs", x, iy + y, z, k, true);
            k--;
        }
        brush
            .setId("dve_dream-leafs")
            .setXYZ(x, y + height, z)
            .paint();
    },
    generateCircle(vox, x, y, z, radius, skipCenter = false) {
        let rx = x - radius;
        let rz = z - radius;
        brush.setId(vox);
        for (let ix = rx; ix <= x + radius; ix++) {
            for (let iz = rz; iz <= z + radius; iz++) {
                if (skipCenter) {
                    if (ix == x && iz == z)
                        continue;
                }
                if (VoxelMath.distance2D(ix, x, iz, z) < radius) {
                    brush.setXYZ(ix, y, iz).paint();
                }
            }
        }
    },
    generatePondChunk(chunkX, chunkZ) {
        let baseY = 31;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    brush.setXYZ(x, y, z);
                    if (y <= baseY - 1) {
                        brush.setId("dve_dreamstone").paint();
                    }
                    if (y >= baseY - 2 && y < baseY + 1) {
                        if (y == baseY - 2 && Math.random() > 0.8) {
                            brush
                                .setId("dve_liquiddreadether")
                                .setSecondaryId("dve_dreamgrass")
                                .paint()
                                .setSecondaryId("dve_air");
                        }
                        else {
                            brush.setId("dve_liquiddreadether").paint();
                        }
                    }
                    if (y <= baseY + 2 && baseY >= baseY) {
                        if (x == chunkX + 15 || z == chunkZ + 15 || x == chunkX || z == chunkZ) {
                            brush.setId("dve_dreadstonepillar").paint();
                        }
                    }
                    if (y <= baseY + 2) {
                        if ((z == chunkZ + 7 && x == chunkX + 7) ||
                            (z == chunkZ + 8 && x == chunkX + 8) ||
                            (z == chunkZ + 7 && x == chunkX + 8) ||
                            (z == chunkZ + 8 && x == chunkX + 7) ||
                            (z == chunkZ + 11 && x == chunkX + 7) ||
                            (z == chunkZ + 5 && x == chunkX + 7) ||
                            //corners
                            //=======
                            (z == chunkZ + 13 && x == chunkX + 13) ||
                            (z == chunkZ + 14 && x == chunkX + 13) ||
                            (z == chunkZ + 13 && x == chunkX + 14) ||
                            //=======
                            (z == chunkZ + 2 && x == chunkX + 1) ||
                            (z == chunkZ + 2 && x == chunkX + 2) ||
                            (z == chunkZ + 1 && x == chunkX + 2) ||
                            //=======
                            (z == chunkZ + 13 && x == chunkX + 1) ||
                            (z == chunkZ + 14 && x == chunkX + 2) ||
                            (z == chunkZ + 13 && x == chunkX + 2) ||
                            //=======
                            (z == chunkZ + 2 && x == chunkX + 14) ||
                            (z == chunkZ + 2 && x == chunkX + 13) ||
                            (z == chunkZ + 1 && x == chunkX + 13)) {
                            brush.setId("dve_dreadstonepillar").paint();
                        }
                    }
                    if (y == baseY + 1 && z == chunkZ + 14 && x == chunkX + 7) {
                        brush.setId("dve_dreadstonepillar").paint();
                    }
                    if (y <= 46 && z == chunkZ + 7 && x == chunkX + 7) {
                        brush.setId("dve_dreadstonepillar").paint();
                    }
                    if (y <= 36 && z == chunkZ + 7 && x == chunkX + 6) {
                        brush.setId("dve_dreadstonepillar").paint();
                    }
                }
            }
        }
    },
    generatePillarChunk(chunkX, chunkZ) {
        let baseY = 31;
        let topY = 80;
        let k = 12;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                let addVine = false;
                if (x == chunkX) {
                    addVine = Math.random() > 0.5;
                }
                if (x == chunkX + 15) {
                    addVine = Math.random() > 0.5;
                }
                if (z == chunkZ) {
                    addVine = Math.random() > 0.5;
                }
                if (z == chunkZ + 15) {
                    addVine = Math.random() > 0.5;
                }
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y < baseY) {
                        brush.setId("dve_dreamstone").setXYZ(x, y, z).paint();
                    }
                    if (y >= baseY && y <= topY) {
                        brush.setId("dve_dreamstonepillar").setXYZ(x, y, z).paint();
                        if (addVine && x == chunkX) {
                            brush
                                .setId("dve_dreamvine")
                                .setXYZ(x - 1, y, z)
                                .setShapeState(2)
                                .paint();
                        }
                        if (addVine && x == chunkX + 15) {
                            brush
                                .setId("dve_dreamvine")
                                .setXYZ(x + 1, y, z)
                                .setShapeState(3)
                                .paint();
                        }
                        if (addVine && z == chunkZ) {
                            brush
                                .setId("dve_dreamvine")
                                .setXYZ(x, y, z - 1)
                                .setShapeState(1)
                                .paint();
                        }
                        if (addVine && z == chunkZ + 15) {
                            brush
                                .setId("dve_dreamvine")
                                .setXYZ(x, y, z + 1)
                                .setShapeState(0)
                                .paint();
                        }
                    }
                    if (y >= topY + 1 && x == chunkX && z == chunkZ) {
                        this.generateCircle("dve_dreamstonepillar", chunkX + 8, y, chunkZ + 8, k);
                        k--;
                    }
                }
            }
        }
    },
    generateDefaultChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < 32; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < 31) {
                        brush.setId("dve_dreamstonepillar").paint();
                        continue;
                    }
                    let flip = Math.random();
                    if (flip >= 0.98) {
                        this.generateTree(x, y, z);
                        continue;
                    }
                    if (flip >= 0.02 && flip <= 0.03) {
                        brush.setId("dve_dreamgrass").paint();
                        continue;
                    }
                }
            }
        }
    },
    generateChunk(chunkX, chunkZ, type = "default") {
        brush.start();
        if (type == "pillar") {
            this.generatePillarChunk(chunkX, chunkZ);
        }
        if (type == "pond") {
            this.generatePondChunk(chunkX, chunkZ);
        }
        if (type == "default") {
            this.generateDefaultChunk(chunkX, chunkZ);
        }
        brush.stop();
    },
};
