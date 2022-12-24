import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
 chunkDepth: 16,
 chunkWidth: 16,
 chunkHeight: 128,
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let maxY = 10;
  brush.start();
  for (let x = chunkX; x < +this.chunkWidth + chunkX; x++) {
   for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
    let currentY = maxY;
    let minus = Math.random() > 0.5;
    if (minus) {
     currentY -= Math.random() * 2;
    } else {
     currentY += Math.random() * 2;
    }
    currentY = currentY >> 0;
    for (let y = 0; y < maxY + 2; y++) {
     if (y < currentY) {
      brush.setId("dve_dreamstonepillar").setXYZ(x, y, z).paint();
     }
     if (Math.random() < 0.01 && y == currentY) {
      brush.setId("dve_dreamlamp").setXYZ(x, y, z).paint();
     }
    }
   }
  }
  brush.stop();
 },
};
