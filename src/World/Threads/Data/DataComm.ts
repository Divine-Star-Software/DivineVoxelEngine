import { DataSync } from "../../Data/DataSync.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const dataComm = ThreadComm.createComm("data-loader", {});

dataComm.listenForMessage("set-chunk", (data) => {
 const chunkX = data[1];
 const chunkY = data[2];
 const chunkZ = data[3];

 DVEW.data.worldRegister.chunk.add("main",chunkX,chunkY,chunkZ,data[4]);
});

export const DataComm = dataComm;

DataSync.registerComm(DataComm);
