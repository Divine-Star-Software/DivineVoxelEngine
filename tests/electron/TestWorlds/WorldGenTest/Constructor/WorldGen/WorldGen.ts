import { DVEC } from "../../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { WorldGenInterface } from "../../../../out/Meta/Interfaces/WorldGen/WorldGen.types.js";

const brush = DVEC.worldGen.getBrush();
export const WorldGen : WorldGenInterface = {
 generate(
  dimension: string,
  chunkX: number,
  y: number,
  chunkZ: number,
  data: any
 ) {
  brush.setId("dve_dreamstone");
  brush.start();
  for (let x = chunkX; x < 16 + chunkX; x++) {
   for (let z = chunkZ; z < 16 + chunkZ; z++) {
    for (let y = 0; y < 18; y++) {
     brush.setXYZ(x, y, z);
     if (y == 5 && Math.random() > 0.98) {
      brush.setId("dve_dreamgrass").setShapeState(0).paint();
     }
     if (y < 5) {
      brush.setId("dve_dreamstone").paint();
     }
    }
   }
  }
  brush.stop();
 },
};
