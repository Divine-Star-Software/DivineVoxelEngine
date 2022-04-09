import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const nexusComm = CreateInterComm("nexus",{});
nexusComm.onSetPort((port)=>{
    DVEW.matrixCentralHub.registerThread("nexus", port);
});
export const NexusComm = nexusComm;










