import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { PerlinNoise3d } from "../../Shared/Noise/Perlin.js";
const perlin = new PerlinNoise3d();
perlin.noiseSeed(666);
const waveLength = 100;
const xOffSet = 1_000;
const zOffSet = 1_000;
const brush = DVEW.getBrush();
const tasks = DVEW.getTasksTool();
export const WorldGen = {


 genChunks: <Record<string, boolean>>{},

 generateFountian(x: number, y: number, z: number) {
  brush.setId("dve_dreadstone").setState(1);

  //eyes
  brush.setXYZ(x, y, z).paint();
  brush.setXYZ(x, y, z - 1).paint();
  brush.setXYZ(x - 1, y, z).paint();
  brush.setXYZ(x - 1, y + 1, z).paint();
  brush.setXYZ(x - 1, y, z).paint();
  brush.setXYZ(x - 1, y + 1, z - 1).paint();
  brush.setXYZ(x - 1, y - 1, z).paint();
  brush.setXYZ(x - 1, y - 1, z - 1).paint();
  brush.setXYZ(x - 2, y, z).paint();
  brush.setXYZ(x - 2, y, z - 2).paint();
  brush.setXYZ(x + 1, y, z).paint();
  brush.setXYZ(x + 1, y + 1, z).paint();
  brush.setXYZ(x + 1, y + 1, z - 1).paint();
  brush.setXYZ(x + 1, y - 1, z).paint();
  brush.setXYZ(x + 1, y - 1, z - 1).paint();
  brush.setXYZ(x + 2, y, z).paint();
  brush.setXYZ(x + 2, y, z - 1).paint();

  brush.setXYZ(x, y, z + 1).paint();
  brush.setXYZ(x - 1, y + 1, z).paint();
  brush.setXYZ(x - 1, y + 1, z + 1).paint();
  brush.setXYZ(x - 1, y - 1, z + 1).paint();
  brush.setXYZ(x - 2, y, z + 1).paint();
  brush.setXYZ(x + 1, y + 1, z + 1).paint();
  brush.setXYZ(x + 1, y - 1, z + 1).paint();
  brush.setXYZ(x + 2, y, z + 1).paint();

  //liquid
  brush.setId("dve_liquiddreadether");
  brush.setXYZ(x - 1, y, z - 1).paint();
  brush.setXYZ(x + 1, y, z - 1).paint();

  tasks.flow.update.add(x - 1, y, z - 1);
  tasks.flow.update.add(x + 1, y, z - 1);

  brush.setXYZ(x - 1, y, z + 1).paint();
  brush.setXYZ(x + 1, y, z + 1).paint();

  tasks.flow.update.add(x - 1, y, z + 1);
  tasks.flow.update.add(x + 1, y, z + 1);

  brush.setId("dve_dreadstone").setState(1);
  let i = y;
  while (i--) {
   brush.setXYZ(x, i, z).paint();
  }
 },

 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let waterLevel = 30;

  // let noHole = true;
  for (let x = chunkX; x < chunkX + 16; x++) {
   for (let z = chunkZ; z < chunkZ + 16; z++) {
    let pillar = Math.random() > 0.992;
    let pillarHeight = (5 + Math.random() * 5) >> 0;
    let fountian = Math.random() > 0.997;
    for (let y = chunkY; y <= chunkY + 100; y++) {
     brush.setXYZ(x, y, z);
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
       brush.setId("dve_dreadstonepillar").paint();
      }
      if (y == waterLevel + pillarHeight) {
       brush.setId("dve_dreadlamp").paint();
      }
      continue;
     }
     if (!pillar) {
      let dreadStoneState = 1;
      if (y >= waterLevel) {
       dreadStoneState = 0;
      }
      if (y <= spikeHeight) {
       brush.setId("dve_dreadstone").setState(dreadStoneState).paint();
      }
      if (y > waterLevel && y == spikeHeight + 1 && Math.random() > 0.9) {
       brush.setId("dve_dreadstone").setState(dreadStoneState).paint();
      }
      if (y <= waterLevel && y > spikeHeight) {
       brush.setId("dve_liquiddreadether").paint();
      }
      continue;
     }
    }
   }
  }
 },

 generate(chunkX: number, chunkY: number, chunkZ: number) {
  brush.start();
  this.generateChunk(chunkX, chunkY, chunkZ);
  brush.stop();
 },
};
