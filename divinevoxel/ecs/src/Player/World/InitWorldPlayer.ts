import { SetUpPlayerData } from "../Data/SetUpPlayerData.js";
import type { DivineVoxelEngineWorld } from "@divinevoxel/core/World";
import { PlayerManager } from "../Data/index.js";
import { WorldPlayer } from "./WorldPlayer.js";

export const INIT_WORLD_PLAYER = async (DVEW: DivineVoxelEngineWorld) => {
  await SetUpPlayerData(DVEW);

  return new WorldPlayer(DVEW, PlayerManager);
};
