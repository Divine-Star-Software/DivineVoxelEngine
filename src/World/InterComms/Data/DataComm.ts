import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const dataComm = CreateInterComm("world-data", {});
dataComm.onSetPort((port) => {
 DVEW.matrixCentralHub.registerThread("data", port);
});

dataComm.messageFunctions["set-chunk"] = (data) => {
 const chunkX = data[1];
 const chunkY = data[2];
 const chunkZ = data[3];
 const chunk = DVEW.worldGeneration.createChunkFromDataThread(data);
 DVEW.worldData.setChunk(chunkX, chunkY, chunkZ, chunk);
};


export const DataComm = dataComm;
