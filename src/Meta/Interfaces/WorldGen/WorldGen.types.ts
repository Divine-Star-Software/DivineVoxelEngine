import { DivineVoxelEngineWorldGeneration } from "Constructor/WorldGeneration/DivineVoxelEngineWorldGeneration";

export type WorldGenInterface = {
  generate(
  DVEWG: DivineVoxelEngineWorldGeneration,
  x: number,
  z: number,
  data: any
 ): Promise<void>;
};
