import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
 generateChunk(chunkX: number, chunkZ: number) {
  brush.start().setId("dve_dreamstone");
  for (let x = chunkX; x < 16 + chunkX; x++) {
   for (let z = chunkZ; z < 16 + chunkZ; z++) {
    for (let y = 0; y < 40; y++) {
     if (y < 31) {
      brush.setXYZ(x, y, z).paint();
     }
    }
   }
  }
  brush.stop();
 },
};
