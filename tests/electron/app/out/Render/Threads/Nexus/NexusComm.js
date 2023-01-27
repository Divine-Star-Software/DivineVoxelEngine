import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const nexusCommBase = ThreadComm.createComm("nexus");
const nexusComm = Object.assign(nexusCommBase, {
    $INIT() {
        nexusComm.connectToComm(DVER.worldComm);
    },
});
export const NexusComm = nexusComm;
