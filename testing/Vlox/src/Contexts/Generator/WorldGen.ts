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
    brush.setId("dve_dread_stone");
    for (let x = cx; x < chunkWidth + cx; x++) {
      for (let z = cz; z < chunkDepth + cz; z++) {
        brush.setXYZ(x, y, z)!.paint();
      }
    }

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

    if (cx == 0 && cz == 0) {
          brush.setId("dve_liquid_dream_ether").setXYZ(8, 8, 8).setLevel(7).paint();
     brush.dataCursor.getVoxel(8, 8, 8)?.updateVoxel(3);
    //  brush.setId("dve_liquid_dream_ether").setXYZ(8, 1, 8).setLevel(7).paint();
    //  brush.dataCursor.getVoxel(8, 1, 8)?.updateVoxel(3);
      brush.clear();
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
