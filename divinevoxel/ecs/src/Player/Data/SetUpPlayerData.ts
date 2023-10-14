import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";
import type { DivineVoxelEngineWorld } from "@divinevoxel/core/World";
import {
  PlayerManager,
  PlayerPhysicsData,
  PlayerStatsData,
} from "../Data/index.js";

export async function SetUpPlayerData(
  DVE: DivineVoxelEngineWorld | DivineVoxelEngineRender
) {
  let playerDataReady = false;
  DVE.TC.registerTasks("connect-player-tags", (data: any[]) => {
    PlayerManager.physics = new PlayerPhysicsData(data[0], data[1]);
    PlayerManager.stats = new PlayerStatsData(data[2], data[3]);
    playerDataReady = true;
  });

  await DVE.UTIL.createPromiseCheck({
    check: () => {
      return playerDataReady;
    },
    checkInterval: 1,
  });
}
