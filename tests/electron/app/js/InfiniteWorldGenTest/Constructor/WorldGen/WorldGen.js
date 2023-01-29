import { DVEC } from "../../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { VoxelMath } from "../../../../out/Math/VoxelMath.js";
import { PerlinNoise3d } from "../../../Shared/Noise/Perlin.js";
const perlin = new PerlinNoise3d();
const perlin2 = new PerlinNoise3d();
const bioneNoise = new PerlinNoise3d();
perlin.noiseSeed(12341234);
perlin2.noiseSeed(989989989);
bioneNoise.noiseSeed(59695022384);
const waveLength = 100;
const xOffSet = 1_000;
const zOffSet = 1_000;
const brush = DVEC.worldGen.getBrush();
const dataTool = brush._dt;
const dreamBiomeVoxels = {
    stone: "dve_dreamstone",
    grass: "dve_dreamgrass",
    water: "dve_liquiddreamether",
};
const dreadBiomeVoxels = {
    stone: "dve_dreadstone",
    grass: "dve_dreadgrass",
    water: "dve_liquiddreadether",
};
const pillarBiome = {
    stone: "dve_dreadstonepillar",
    grass: "dve_dreadstonepillar",
    water: "dve_dreadstonepillar",
};
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateTree(x, y, z) {
        brush.setId("dve_dream-log");
        if (dataTool.loadInAt(x, y - 1, z)) {
            if (!dataTool.isRenderable())
                return;
        }
        let height = (30 * Math.random()) >> 0;
        height < 5 ? (height += 5) : true;
        for (let i = 0; i < height; i++) {
            brush.setXYZ(x, y + i, z).paint();
        }
        let k = 5;
        for (let iy = height - 4; iy <= height + 1; iy++) {
            this.generateCircle("dve_dream-leafs", x, iy + y, z, k, true, true);
            k--;
        }
        brush
            .setId("dve_dream-leafs")
            .setXYZ(x, y + height, z)
            .paint();
    },
    generateSpike(xp, minY, zp) {
        brush.setId("dve_dreadstonepillar");
        let rx = 0;
        for (let x = xp; x < 16 + xp; x++) {
            let rz = 0;
            for (let z = zp; z < 16 + zp; z++) {
                for (let y = 0; y < +200; y++) {
                    brush.setXYZ(x, y, z);
                    if (dataTool.loadInAt(x, y, z)) {
                        if (dataTool.isRenderable())
                            continue;
                    }
                    if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
                        if (y == minY ||
                            y == minY + 28 ||
                            y == minY + 54 ||
                            y == minY + 56 ||
                            y == minY + 86) {
                            brush.paint();
                        }
                    }
                    if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
                        if (y == minY + 1 ||
                            y == minY + 26 ||
                            y == minY + 30 ||
                            y == minY + 52 ||
                            y == minY + 58 ||
                            y == minY + 84 ||
                            y == minY + 88) {
                            brush.paint();
                        }
                    }
                    if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
                        if (y == minY + 2 ||
                            y == minY + 24 ||
                            y == minY + 32 ||
                            y == minY + 52 ||
                            y == minY + 60 ||
                            y == minY + 82 ||
                            y == minY + 86 ||
                            y == minY + 90) {
                            brush.paint();
                        }
                    }
                    if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
                        if (y == minY + 4 ||
                            y == minY + 22 ||
                            y == minY + 34 ||
                            y == minY + 50 ||
                            y == minY + 62 ||
                            y == minY + 80 ||
                            y == minY + 88 ||
                            y == minY + 92) {
                            brush.paint();
                        }
                    }
                    if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
                        if (y == minY + 6 ||
                            y == minY + 20 ||
                            y == minY + 36 ||
                            y == minY + 48 ||
                            y == minY + 64 ||
                            y == minY + 78 ||
                            y == minY + 90 ||
                            y == minY + 94) {
                            brush.paint();
                        }
                    }
                    if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
                        if (y == minY + 8 ||
                            y == minY + 18 ||
                            y == minY + 38 ||
                            y == minY + 46 ||
                            y == minY + 66 ||
                            y == minY + 74 ||
                            y == minY + 96) {
                            brush.paint();
                        }
                    }
                    if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
                        if (y == minY + 10 ||
                            y == minY + 16 ||
                            y == minY + 40 ||
                            y == minY + 44 ||
                            y == minY + 68 ||
                            y == minY + 72 ||
                            y == minY + 98) {
                            brush.paint();
                        }
                    }
                    if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
                        if (y == minY + 12 ||
                            y == minY + 14 ||
                            y == minY + 42 ||
                            y == minY + 70 ||
                            minY + 100) {
                            brush.paint();
                        }
                    }
                    if (y < minY) {
                        brush.paint();
                    }
                }
                rz++;
            }
            rx++;
        }
    },
    generateCircle(vox, x, y, z, radius, skipCenter = false, noDestory = false) {
        let rx = x - radius;
        let rz = z - radius;
        brush.setId(vox);
        for (let ix = rx; ix <= x + radius; ix++) {
            for (let iz = rz; iz <= z + radius; iz++) {
                if (skipCenter) {
                    if (ix == x && iz == z)
                        continue;
                }
                if (noDestory) {
                    if (dataTool.loadInAt(ix, y, iz)) {
                        if (dataTool.isRenderable())
                            continue;
                    }
                }
                if (VoxelMath.distance2D(ix, x, iz, z) < radius) {
                    brush.setXYZ(ix, y, iz).paint();
                }
            }
        }
    },
    generate(dimension, chunkX, y, chunkZ, data) {
        brush.start();
        let madeSpke = false;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                const bn = bioneNoise.get((x - 4_000) / 200, 0, (z + zOffSet) / 200);
                let biome = "dream";
                let voxels = dreamBiomeVoxels;
                if (bn > 0.3) {
                    biome = "dread";
                    voxels = dreadBiomeVoxels;
                }
                if (bn > 0.5) {
                    biome = "pillar";
                    voxels = pillarBiome;
                }
                if (bn > 0.7) {
                    biome = "dream";
                    voxels = dreamBiomeVoxels;
                }
                if (bn == 0.5) {
                    biome = "pillar-mix";
                    if (Math.random() > 0.6) {
                        voxels = pillarBiome;
                    }
                    else {
                        voxels = dreadBiomeVoxels;
                    }
                }
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y == 0) {
                        brush.setId(voxels.stone);
                        brush.setXYZ(x, y, z).paint();
                        continue;
                    }
                    let wl = waveLength;
                    if (biome == "dread") {
                        wl = 40;
                    }
                    if (biome == "pillar") {
                        wl = 20;
                    }
                    if (biome == "pillar-mix") {
                        wl = 30;
                    }
                    const height = (perlin.get((x + xOffSet) / wl, y / wl, (z + zOffSet) / wl) * 120) >>> 0;
                    const carve = perlin2.get((x + xOffSet) / 30, y / 30, (z + zOffSet) / 50) * 0.9;
                    if (y == height - 1 && !(carve > 0.5 && carve < 0.6)) {
                        let flip = Math.random();
                        if (flip > 0.96) {
                            if (biome == "dream") {
                                this.generateTree(x, y, z);
                                continue;
                            }
                        }
                        if (flip > 0.99 && y > 50) {
                            let flip2 = Math.random();
                            if (flip2 > 0.99) {
                                if (biome == "dread" && !madeSpke) {
                                    madeSpke = true;
                                    this.generateSpike(x, y, z);
                                }
                            }
                        }
                    }
                    if (y < height && !(carve > 0.5 && carve < 0.6)) {
                        brush.setId(voxels.stone);
                        brush.setXYZ(x, y, z).paint();
                        let flip = Math.random();
                        if (flip > 0.92) {
                            brush.setId(voxels.grass);
                            brush.setXYZ(x, y + 1, z).paint();
                        }
                    }
                    else {
                        if (y <= 30) {
                            brush.setId(voxels.water);
                            brush.setXYZ(x, y, z).paint();
                            continue;
                        }
                    }
                }
            }
        }
        brush.stop();
    },
};
