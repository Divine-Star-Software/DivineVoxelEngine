import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const nexusComm = ThreadComm.createComm("nexus");
nexusComm.onSetPort((port) => {
    DVEW.matrixCentralHub.registerThread("nexus", port);
});
export const NexusComm = nexusComm;
