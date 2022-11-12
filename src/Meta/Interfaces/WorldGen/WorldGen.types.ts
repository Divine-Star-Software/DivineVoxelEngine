import { DivineVoxelEngineWorldGeneration } from "Constructor/WorldGeneration/WorldGeneration";

export type WorldGenInterface = {
  generate(
  DVEWG: DivineVoxelEngineWorldGeneration,
  x: number,
  z: number,
  data: any
 ): Promise<void>;
};
