import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGenInterface } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGen.types";
import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
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

    for (let x = cx; x < 16 + cx; x++) {
      for (let z = cz; z < 16 + cz; z++) {
        brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
  /*       brush
          .setId("dve_liquid_dream_ether")
          .setLevel(15)
          .setXYZ(x, y + 1, z)
          .paint()
          .clear(); */
      }
    }

    brush.stop();
  }

  async decorate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {}
}
