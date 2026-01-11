import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";

export interface GenType {
  init(): void;
  generate(
    x: number,
    y: number,
    z: number,
    brush: WorldGenBrush
  ): Promise<void>;
  decorate(
    x: number,
    y: number,
    z: number,
    brush: WorldGenBrush
  ): Promise<void>;
}
