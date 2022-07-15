import { DivineVoxelEngineWorldGeneration } from "../../../../out/Constructor/WorldGeneration/DivineVoxelEngineWorldGeneration";

export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,

 async generate(
  DVEWG: DivineVoxelEngineWorldGeneration,
  chunkX: number,
  chunkZ: number,
  data: any
 ) {
  let type = "default";

  let topY = 31;
  let groundY = 31;
  for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y < groundY) {
      DVEWG.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
      continue;
     }
     let flip = Math.random();
     if (flip >= 0.1) {
      continue;
     }
     if (flip <= 0.01) {
      await DVEWG.paintVoxel("dve:dreamstoneslab", "default", 0, x, topY, z);
      continue;
     }
     if (flip >= 0.01 && flip <= 0.02) {
      await DVEWG.paintVoxel("dve:dreamstone", "default", 0, x, topY, z);
      let flip2 = Math.random();
      if (flip2 < 0.01) {
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 1,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 2,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 3,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 4,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 4,
        z + 1
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 4,
        z - 1
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x + 1,
        topY + 4,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x - 1,
        topY + 4,
        z
       );
       await DVEWG.paintVoxel(
        "dve:dreamgrassblock",
        "default",
        0,
        x,
        topY + 5,
        z
       );
      }
      continue;
     }
     if (flip >= 0.02 && flip <= 0.03) {
      await DVEWG.paintVoxel("dve:dreamgrass", "default", 0, x, topY, z);
      continue;
     }
    }
   }
  }
 },
};
