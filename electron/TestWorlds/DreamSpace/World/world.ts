import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { PlayerWatcher } from "./PlayerWatcher/PlayerWatcher.js";
import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW);

const playerWatcher = new PlayerWatcher(DVEW);

DVEW.renderComm.listenForMessage("voxel-add", async (data, event) => {
 await DVEW.worldData.requestVoxelAdd(
  "dve:dreamstone",
  "default",
  data[1],
  data[2],
  data[3]
 );
 //DVEW.runChunkRebuildQue();
});
DVEW.renderComm.listenForMessage("voxel-remove", async (data, event) => {
 await DVEW.worldData.requestVoxelBeRemoved(data[1], data[2], data[3]);
 // DVEW.runChunkRebuildQue();
});
DVEW.renderComm.listenForMessage("connect-player", (data, event) => {
 playerWatcher.setPlayerSharedArrays(data);
 playerWatcher.startWatchingPlayer();
});

await DVEW.$INIT({});

const numChunks = 5;
let startX = -16 * numChunks;
let startZ = -16 * numChunks;
let endX = 16 * numChunks;
let endZ = 16 * numChunks;

const t1 = performance.now();
for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateWorldColumn(x, z);
 }
}
const t2 = performance.now();
console.log(t2 - t1);

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  for (let y = 0; y < 8; y++) {
   DVEW.buildChunk(x, 32 * y, z);
  }
 }
}
