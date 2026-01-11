import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGenInterface } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGen.types";
import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
import { GenType } from "./Types/GenType.interface";

export class WorldGen implements WorldGenInterface {
  static instance: WorldGen;
  brush: WorldGenBrush;
  genType: GenType | null = null;
  constructor() {
    if (WorldGen.instance) return WorldGen.instance;
    WorldGen.instance = this;
  }
  init() {
    this.brush = WorldGeneration.getBrush();
    WorldGeneration.setWorldGen(this);
  }

  setGenType(genType: GenType) {
    this.genType = genType;
  }

  async generate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {
    const brush = this.brush;
    brush.start(dimension, cx, y, cz);
    if (this.genType) {
      await this.genType.generate(cx, y, cz, brush);
      return;
    }

    const chunkWidth = WorldSpaces.section.bounds.x;
    const chunkDepth = WorldSpaces.section.bounds.z;
    let minus = 0;
    const startY = 60;

    brush.setId("dve_dread_stone");
    for (let x = cx + minus; x < chunkWidth + cx - minus; x++) {
      for (let z = cz + minus; z < chunkDepth + cz - minus; z++) {
        brush.setXYZ(x, startY + y, z)!.paint();
      }
    }

    brush.stop();
  }

  async decorate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {
    const brush = this.brush;
    brush.start(dimension, cx, y, cz);
    if (this.genType) {
      await this.genType.decorate(cx, y, cz, brush);
      return;
    }
  }
}
