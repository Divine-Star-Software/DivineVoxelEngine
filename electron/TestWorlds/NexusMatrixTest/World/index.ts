import { DVEW } from "../../../out/index.js";

import { PlayerWatcher } from "../../Shared/Player/Type2/PlayerWatcher.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

const playerWatcher = new PlayerWatcher(DVEW);
const worldGen = new WorldGen(DVEW);

RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");

const start = () => {
 let startX = -32;
 let startZ = -32;
 let endX = 32;
 let endZ = 32;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   worldGen.generateChunk(x, 0, z);
  }
 }

 DVEW.runRGBLightUpdateQue();
  for (let x = startX; x < endX; x += 16) {
   for (let z = startZ; z < endZ; z += 16) {
    DVEW.buildChunkAsync(x, 0, z);
   }
  }
  DVEW.buildFluidMesh();


  DVEW.sendMessageToNexus("done", []);
};

(async () => {
 await DVEW.$INIT({
  onReady: start,
  onMessage: (message: string, data: any[]) => {
   if (message == "connect-player") {
    playerWatcher.setPlayerSharedArrays(data);
    playerWatcher.startWatchingPlayer();
   }
  },
 });
})();
