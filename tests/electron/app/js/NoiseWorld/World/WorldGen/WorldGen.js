import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
import { PerlinNoise3d } from "../../../Shared/Noise/Perlin.js";
const perlin = new PerlinNoise3d();
const perlin2 = new PerlinNoise3d();
perlin.noiseSeed(12341234);
perlin2.noiseSeed(989989989);
const waveLength = 50;
const xOffSet = 1_000;
const zOffSet = 1_000;
const brush = DVEW.getBrush();
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateChunk(chunkX, chunkZ) {
        brush.start();
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y == 0) {
                        brush.setId("dve:dreamstone");
                        brush.setXYZ(x, y, z).paint();
                        continue;
                    }
                    const height = (perlin.get((x + xOffSet) / waveLength, y / waveLength, (z + zOffSet) / waveLength) *
                        120) >>>
                        0;
                    const carve = perlin2.get((x + xOffSet) / 30, y / 30, (z + zOffSet) / 30) * 0.9;
                    if (y < height && !(carve > 0.5 && carve < 0.6)) {
                        brush.setId("dve:dreamstone");
                        brush.setXYZ(x, y, z).paint();
                        let flip = Math.random();
                        if (flip > 0.92) {
                            brush.setId("dve:dreamgrass");
                            brush.setXYZ(x, y + 1, z).paint();
                        }
                    }
                    else {
                        if (y <= 6) {
                            brush.setId("dve:liquiddreamether");
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
