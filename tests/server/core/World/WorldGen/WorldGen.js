import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { VoxelMath } from "../../../out/Libs/Math/VoxelMath.js";
import { PerlinNoise3d } from "./PerlinNoise.js";
const perlin = new PerlinNoise3d();
const perlin2 = new PerlinNoise3d();
const bioneNoise = new PerlinNoise3d();
perlin.noiseSeed(12341234);
perlin2.noiseSeed(989989989);
bioneNoise.noiseSeed(59695022384);
const waveLength = 100;
const xOffSet = 1_000;
const zOffSet = 1_000;
const brush = DVEW.getBrush();
const dataTool = DVEW.getDataTool();
const dreamBiomeVoxels = {
    stone: "dve:dreamstone",
    grass: "dve:dreamgrass",
    water: "dve:liquiddreamether",
};
const dreadBiomeVoxels = {
    stone: "dve:dreadstone",
    grass: "dve:dreadgrass",
    water: "dve:liquiddreadether",
};
const pillarBiome = {
    stone: "dve:dreadstonepillar",
    grass: "dve:dreadstonepillar",
    water: "dve:dreadstonepillar",
};
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
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
        brush.setId("dve:dream-log");
        let height = (30 * Math.random()) >> 0;
        height < 5 ? (height += 5) : true;
        for (let i = 0; i < height; i++) {
            brush.setXYZ(x, y + i, z).paint();
        }
        let k = 5;
        for (let iy = height - 4; iy <= height + 1; iy++) {
            this.generateCircle("dve:dream-leafs", x, iy + y, z, k, true, true);
            k--;
        }
        brush
            .setId("dve:dream-leafs")
            .setXYZ(x, y + height, z)
            .paint();
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
                    if (dataTool.loadIn(ix, y, iz)) {
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
    generate(chunkX, chunkZ) {
        brush.start();
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
                    if (y == height && !(carve > 0.5 && carve < 0.6)) {
                        let flip = Math.random();
                        if (flip > 0.96) {
                            if (biome == "dream") {
                                this.generateTree(x, y, z);
                                continue;
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
