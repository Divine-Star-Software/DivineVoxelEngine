import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";

const worldComm = ThreadComm.createComm("world");
worldComm.listenForMessage("remove-chunk", (data) => {
 const chunkX = data[1];
 const chunkY = data[2];
 const chunkZ = data[3];
 const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
  chunkX,
  chunkY,
  chunkZ
 );
 DVER.meshManager.requestChunkBeRemoved(chunkKey);
});
export const WorldComm = worldComm;
