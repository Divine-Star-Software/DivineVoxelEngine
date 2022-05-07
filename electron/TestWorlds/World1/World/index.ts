import { DVEW } from "../../../out/index.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures-o.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { PlayerWatcher } from "./PlayerWatcher/PlayerWatcher.js";
import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");

const worldGen = new WorldGen(DVEW);
const playerWatcher = new PlayerWatcher(worldGen, DVEW);

DVEW.renderComm.listenForMessage("voxel-add", (data, event) => {
 DVEW.worldData.requestVoxelAdd(
  "dve:dreamstone",
  "default",
  data[1],
  data[2],
  data[3]
 );
 DVEW.runChunkRebuildQueAsync();
});
DVEW.renderComm.listenForMessage("voxel-remove", (data, event) => {
 DVEW.worldData.requestVoxelBeRemoved(data[1], data[2], data[3]);
 DVEW.runChunkRebuildQue();
});
DVEW.renderComm.listenForMessage("connect-player", (data, event) => {
 playerWatcher.setPlayerSharedArrays(data);
 playerWatcher.startWatchingPlayer();
});

await DVEW.$INIT({
 onReady: () => {},
});

const numChunks = 8;
let startX = -16 * numChunks;
let startZ = -16 * numChunks;
let endX = 16 * numChunks;
let endZ = 16 * numChunks;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  const chunks = worldGen.generateChunkNormal(x, z);
  for (let y = 0; y < chunks.length; y++) {
   DVEW.worldData.setChunk(x, 128 * y, z, chunks[y]);
  }
 }
}
for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  for (let y = 0; y < 2; y++) {
   DVEW.buildChunk(x, 128 * y, z);
  }
 }
}

setTimeout(()=> {
    DVEW.buildFluidMesh();
 },8000)
