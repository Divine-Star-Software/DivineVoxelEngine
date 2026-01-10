import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGenInterface } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGen.types";
import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";

export class WorldGen implements WorldGenInterface {
  static instance: WorldGen;
  brush: WorldGenBrush;
  constructor() {
    if (WorldGen.instance) return WorldGen.instance;
    WorldGen.instance = this;
  }
  init() {
    this.brush = WorldGeneration.getBrush();
    WorldGeneration.setWorldGen(this);
  }

  async generate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {
    const brush = this.brush;
    brush.start(dimension, cx, y, cz);

    const chunkWidth = WorldSpaces.section.bounds.x;
    const chunkDepth = WorldSpaces.section.bounds.z;
    let minus = 0;
    const startY = 60;

    if (cx == 0 && cz == 0) {
      for (let x = cx; x < chunkWidth + cx; x++) {
        for (let z = cz; z < chunkDepth + cz; z++) {
          brush.setId("dve_dread_stone").setXYZ(x, startY, z)!.paint();
          if (x - cx == 7 && z - cz == 7) {
            brush
              .setId("dve_dream_fence")
              .setXYZ(x, startY + 1, z)
              .paint();
            brush.setXYZ(x + 1, startY + 1, z).paint();
            brush.setXYZ(x - 1, startY + 1, z).paint();
            brush.setXYZ(x, startY + 1, z + 1).paint();
            brush.setXYZ(x, startY + 1, z - 1).paint();
          }
          /* 

          if (x - cx == 7 && z - cz == 7) {
            brush
              .setId("dve_liquid_dream_ether")
              .setLevel(7)
              .setXYZ(x, startY + 1, z)!
              .paint();
            brush.clear();
          } else {
            brush
              .setId("dve_farmland")
              .setXYZ(x, startY + 1, z)
              .paint();
            if (Math.random() > 0.1) {
              brush
                .setId("dve_wheat")
                .setXYZ(x, startY + 2, z)
                .paint();
            }
          } */
        }
      }
    } else {
      brush.setId("dve_dread_stone");
      for (let x = cx + minus; x < chunkWidth + cx - minus; x++) {
        for (let z = cz + minus; z < chunkDepth + cz - minus; z++) {
          brush.setXYZ(x, startY + y, z)!.paint();
        }
      }
    }

    /*
       const height = 10;
      for (let y = 0; y < 1 + height; y++) {
        //   if (y % 2 == 0) continue;
        for (let x = cx + minus; x < chunkWidth + cx - minus; x++) {
          for (let z = cz + minus; z < chunkDepth + cz - minus; z++) {
            brush.setXYZ(x, y, z)!.paint();
          }
        }
        minus++;
      }
     */
    brush.stop();
  }

  async decorate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {}
}
