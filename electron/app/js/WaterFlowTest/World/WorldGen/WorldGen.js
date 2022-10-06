import { PerlinNoise3d } from "../../../Shared/Noise/Perlin.js";
import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const perlin = new PerlinNoise3d();
perlin.noiseSeed(1234);
const waveLength = 100;
const xOffSet = 2_000;
const zOffSet = -1_234;
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 128,
    generateChunk(chunkX, chunkZ) {
        let topY = 31;
        let groundY = 31;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    const height = (perlin.get((x + xOffSet) / waveLength, y / waveLength, (z + zOffSet) / waveLength) *
                        55) >>>
                        0;
                    if (y < height) {
                        DVEW.worldData.paintVoxel("dve:lightdebug", 0, 0, x, y, z);
                        continue;
                    }
                }
            }
        }
    },
};
