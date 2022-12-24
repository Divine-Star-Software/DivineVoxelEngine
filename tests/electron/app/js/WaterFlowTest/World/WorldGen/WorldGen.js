import { PerlinNoise3d } from "../../../Shared/Noise/Perlin.js";
import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const perlin = new PerlinNoise3d();
perlin.noiseSeed(1234);
const waveLength = 100;
const xOffSet = 2_000;
const zOffSet = -1_234;
const brush = DVEW.getBrush();
brush.setId("dve_lightdebug");
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        brush.start();
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 60; y++) {
                    const height = (perlin.get((x + xOffSet) / waveLength, y / waveLength, (z + zOffSet) / waveLength) *
                        55) >>>
                        0;
                    if (y < height) {
                        brush.setXYZ(x, y, z).paint();
                        continue;
                    }
                }
            }
        }
        brush.start();
    },
};
