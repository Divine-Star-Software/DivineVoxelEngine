import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
const worldComm = ThreadComm.createComm("world");
worldComm.listenForMessage("remove-chunk", (data) => {
    const chunkX = data[1];
    const chunkY = data[2];
    const chunkZ = data[3];
    const chunkKey = WorldBounds.getChunkKeyFromPosition(chunkX, chunkY, chunkZ);
    DVER.meshManager.requestChunkBeRemoved(0, chunkKey);
});
export const WorldComm = worldComm;
