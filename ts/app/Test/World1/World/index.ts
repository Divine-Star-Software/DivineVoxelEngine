import { DivineVoxelEngineWorld } from "../../../Core/Contexts/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "./Functions/RegisterTextures.js";
import { RegisterVoxels } from "./Functions/RegisterVoxels.js";
import { PlayerWatcher } from "./PlayerWatcher/PlayerWatcher.js";
import { WorldGen } from "./WorldGen/WorldGen.js";

const DVEW = new DivineVoxelEngineWorld(self as any);

RegisterTexutres(DVEW);
RegisterVoxels(DVEW);


const worldGen = new WorldGen(DVEW);
const playerWatcher = new PlayerWatcher(worldGen);
const start = () => {
 let chunkNum = 20;
 let totalChunks = chunkNum * 16 - 144;
 for (let i = -144; i < totalChunks; i += 16) {
  for (let k = -144; k < totalChunks; k += 16) {
   const chunk = worldGen.generateChunk(i, k);
   DVEW.worldData.setChunk(i, k, chunk);
  }
 }
 for (let i = -144; i < totalChunks; i += 16) {
  for (let k = -144; k < totalChunks; k += 16) {
    DVEW.buildChunk(i,k);
  }
 }
};

DVEW.$INIT({
 onReady: start,
 onMessage: (message: string, data: any[]) => {
  if (message == "connect-player") {
   playerWatcher.setPlayerSharedArrays(data[1], data[2], data[3]);
   playerWatcher.startWatchingPlayer();
  }
 },
});
