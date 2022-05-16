import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const worldComm = CreateInterComm("render-world", {});
export const WorldComm = worldComm;
worldComm.listenForMessage("remove-chunk", (data) => {
    const chunkX = data[1];
    const chunkY = data[2];
    const chunkZ = data[3];
    const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(chunkX, chunkY, chunkZ);
    DVER.meshManager.requestChunkBeRemoved(chunkKey);
});
