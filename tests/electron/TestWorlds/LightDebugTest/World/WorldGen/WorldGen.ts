import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
 generateChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let baseY = 0;
  brush.start();
  let rx = 0;
  for (let x = chunkX; x < chunkX + 16; x++) {
   let rz = 0;
   for (let z = chunkZ; z < chunkZ + 16; z++) {
    for (let y = 0; y < 100; y++) {
     brush.setXYZ(x, y, z);
     if (rx == 7 && rz == 7 && y == baseY + 10) {
      continue;
     }
     if (rx == 7 && y <= baseY + 15 && rz != 7) {
      brush.setId("dve_dreamstonepillar").paint();
     }
     if (rx == 8 && y <= baseY + 15 && rz == 10) {
      brush.setId("dve_dreamstonepillar").paint();
     }
     if (y <= baseY + 3 && chunkX >= 0) {
      brush.setId("dve_liquiddreamether").paint();
     }
     if (y <= baseY + 3 && chunkX < 0) {
      brush.setId("dve_lightdebug").paint();
     }
     if (y == baseY + 10) {
      brush.setId("dve_dreamstonepillar").paint();
     }
     if (y == baseY + 6) {
     }
    }
    rz++;
   }
   rx++;
  }
  brush.stop();
 },
};
