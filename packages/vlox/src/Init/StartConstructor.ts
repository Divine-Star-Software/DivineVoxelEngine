import {
  DivineVoxelEngineConstructor,
  DivineVoxelEngineConstructorInitData,
} from "../Contexts/Constructor/DivineVoxelEngineConstructor";

import InitVoxelModels from "../VoxelModels/Constructor/InitVoxelModelsConstructor.js";
export async function StartContrusctor(
  data: DivineVoxelEngineConstructorInitData
) {
  const DVEC = new DivineVoxelEngineConstructor(data);

  await DVEC.init();
  InitVoxelModels(DVEC);

  return DVEC;
}
