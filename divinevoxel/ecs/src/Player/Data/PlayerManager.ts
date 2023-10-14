import { PlayerPhysicsData } from "./PlayerPhysicsData.js"
import { PlayerStatsData } from "./PlayerStatsData.js";


export const PlayerManager = {
  currentDimension: "main",
  physics: <PlayerPhysicsData>{},
  stats: <PlayerStatsData>{},
  $INIt(data: any[]) {},
};
