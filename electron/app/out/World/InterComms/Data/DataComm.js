import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const dataComm = ThreadComm.createComm("world-data", {});
dataComm.onSetPort((port) => {
    DVEW.matrixCentralHub.registerThread("data", port);
});
dataComm.listenForMessage("set-chunk", (data) => {
    const chunkX = data[1];
    const chunkY = data[2];
    const chunkZ = data[3];
    const chunk = DVEW.worldGeneration.createChunkFromDataThread(data);
    DVEW.worldData.setChunk(chunkX, chunkY, chunkZ, chunk);
});
export const DataComm = dataComm;
