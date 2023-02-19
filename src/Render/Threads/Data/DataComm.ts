import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "threadcomm";

const dataCommBase = ThreadComm.createComm("data-loader", {});

const dataComm = Object.assign(dataCommBase, {
 $INIT() {
  dataComm.connectToComm(DVER.worldComm);
 },
});

export const DataComm = dataComm;
