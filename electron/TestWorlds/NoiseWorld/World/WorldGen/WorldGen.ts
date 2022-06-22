import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";

import { PerlinNoise3d } from "../../../Shared/Noise/Perlin.js";
const perlin = new PerlinNoise3d();
const waveLength = 50;
console.log(perlin);
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 generateChunk(chunkX: number, chunkZ: number) {
  let topY = 31;
  let groundY = 31;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    const height =
     (perlin.get(x / waveLength, z / waveLength, 1 / waveLength) * 120) >>> 0;
    for (let y = 0; y < height; y++) {
     if (y < height) {
      DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, y, z);
      continue;
     }
     let flip = Math.random();
     if (flip >= 0.1) {
      continue;
     }
     if (flip <= 0.01) {
      DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", x, topY, z);
      continue;
     }
     if (flip >= 0.01 && flip <= 0.02) {
      DVEW.worldData.paintVoxel("dve:dreamstone", "default", x, topY, z);
      let flip2 = Math.random();
      if (flip2 < 0.01) {
       DVEW.worldData.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        x,
        topY + 1,
        z
       );
      }
      continue;
     }
     if (flip >= 0.02 && flip <= 0.03) {
      DVEW.worldData.paintVoxel("dve:dreamgrass", "default", x, topY, z);
      continue;
     }
    }
   }
  }
 },
};
