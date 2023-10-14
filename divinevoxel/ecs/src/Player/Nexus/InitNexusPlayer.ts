import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { $RegisterPlayerData } from "../Data/RegisterPlayerData.js";
import { DivineVoxelEngineNexus } from "@divinevoxel/core/Nexus";
import { NexusPlayer } from "./NexusPlayer.js";
async function SetUpPlayerData(DVEN: DivineVoxelEngineNexus) {
  const { playerPhysicsTagManager, playerStatesTagManger } =
    $RegisterPlayerData();
  const physicsRemoteData = playerPhysicsTagManager.initData;
  const playePhysicsrDataSAB = new SharedArrayBuffer(
    physicsRemoteData.bufferSize
  );
  playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
  PlayerManager.physics = new PlayerPhysicsData(
    playePhysicsrDataSAB,
    physicsRemoteData
  );

  const statsRemoteData = playerStatesTagManger.initData;
  const playeStatsDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
  playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
  PlayerManager.stats = new PlayerStatsData(playeStatsDataSAB, statsRemoteData);

  await DVEN.parentComm.waitTillTasksExist("connect-player-tags");
  DVEN.parentComm.runTasks("connect-player-tags", [
    playePhysicsrDataSAB,
    physicsRemoteData,
    playeStatsDataSAB,
    statsRemoteData,
  ]);
  await DVEN.worldComm.waitTillTasksExist("connect-player-tags");
  DVEN.worldComm.runTasks("connect-player-tags", [
    playePhysicsrDataSAB,
    physicsRemoteData,
    playeStatsDataSAB,
    statsRemoteData,
  ]);
}

export const INIT_NEXUS_PLAYER = async (DVEN: DivineVoxelEngineNexus) => {
  await SetUpPlayerData(DVEN);
  const player = new NexusPlayer(PlayerManager.physics, PlayerManager.stats);

  return player;
};
