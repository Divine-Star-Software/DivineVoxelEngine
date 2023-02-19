import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "threadcomm";

const nexusCommBase = ThreadComm.createComm("nexus");

const nexusComm = Object.assign(nexusCommBase, {
 $INIT() {
  nexusComm.connectToComm(DVER.worldComm);
 },
});

export const NexusComm = nexusComm;
