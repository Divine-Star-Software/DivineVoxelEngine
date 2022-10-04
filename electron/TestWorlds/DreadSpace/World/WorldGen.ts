import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { PerlinNoise3d } from "../../Shared/Noise/Perlin.js";
const perlin = new PerlinNoise3d();
perlin.noiseSeed(666);
const waveLength = 100;
const xOffSet = 1_000;
const zOffSet = 1_000;
const wd = DVEW.worldData;
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 genChunks: <Record<string, boolean>>{},

 generateFountian(x: number, y: number, z: number) {
  let vox1 = "dve:dreadstone";
  let v1s = 1;
  //eyes
  wd.paintVoxel(vox1, v1s, 0, x, y, z);
  wd.paintVoxel(vox1, v1s, 0, x, y, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y, z);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y + 1, z);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y + 1, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y - 1, z);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y - 1, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x - 2, y, z);
  wd.paintVoxel(vox1, v1s, 0, x - 2, y, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y, z);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y + 1, z);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y + 1, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y - 1, z);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y - 1, z - 1);
  wd.paintVoxel(vox1, v1s, 0, x + 2, y, z);
  wd.paintVoxel(vox1, v1s, 0, x + 2, y, z - 1);

  wd.paintVoxel(vox1, v1s, 0, x, y, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y + 1, z);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y + 1, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x - 1, y - 1, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x - 2, y, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y + 1, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x + 1, y - 1, z + 1);
  wd.paintVoxel(vox1, v1s, 0, x + 2, y, z + 1);
  //liquid
  wd.paintVoxel("dve:liquiddreadether", 0, 0, x - 1, y, z - 1);
  wd.paintVoxel("dve:liquiddreadether", 0, 0, x + 1, y, z - 1);
  DVEW.queues.addToFlowRunQue(x - 1, y, z - 1);
  DVEW.queues.addToFlowRunQue(x + 1, y, z - 1);

  wd.paintVoxel("dve:liquiddreadether", 0, 0, x - 1, y, z + 1);
  wd.paintVoxel("dve:liquiddreadether", 0, 0, x + 1, y, z + 1);
  DVEW.queues.addToFlowRunQue(x - 1, y, z + 1);
  DVEW.queues.addToFlowRunQue(x + 1, y, z + 1);

  let i = y;
  while (i--) {
   wd.paintVoxel(vox1, v1s, 0, x, i, z);
  }
 },

 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let waterLevel = 30;

  // let noHole = true;
  for (let x = chunkX; x < chunkX + this.chunkWidth; x++) {
   for (let z = chunkZ; z < chunkZ + this.chunkDepth; z++) {
    let pillar = Math.random() > 0.992;
    let pillarHeight = (5 + Math.random() * 5) >> 0;
    let fountian = Math.random() > 0.997;
    for (let y = chunkY; y <= chunkY + this.chunkHeight; y++) {
     if (fountian) {
      if (y < waterLevel + pillarHeight * 2) continue;
      this.generateFountian(x, y, z);
      fountian = false;
     }

     const spikeHeight =
      (perlin.get(
       (x + xOffSet) / waveLength,
       y / waveLength,
       (z + zOffSet) / waveLength
      ) *
       55) >>>
      0;

     if (pillar) {
      if (y < waterLevel + pillarHeight) {
       DVEW.worldData.paintVoxel("dve:dreadstonepillar", 0, 0, x, y, z);
      }
      if (y == waterLevel + pillarHeight) {
       DVEW.worldData.paintVoxel("dve:dreadlamp", 0, 0, x, y, z);
      }
      continue;
     }
     if (!pillar) {
      let dreadStoneState = 1;
      if (y >= waterLevel) {
       dreadStoneState = 0;
      }
      if (y <= spikeHeight) {
       DVEW.worldData.paintVoxel("dve:dreadstone", dreadStoneState, 0, x, y, z);
      }
      if (y > waterLevel && y == spikeHeight + 1 && Math.random() > 0.9) {
       DVEW.worldData.paintVoxel("dve:dreadgrass", dreadStoneState, 0, x, y, z);
      }
      if (y <= waterLevel && y > spikeHeight) {
       DVEW.worldData.paintVoxel("dve:liquiddreadether", 0, 0, x, y, z);
      }
      continue;
     }
    }
   }
  }
 },

 generate(chunkX: number, chunkY: number, chunkZ: number) {
  this.generateChunk(chunkX, chunkY, chunkZ);
 },
};
