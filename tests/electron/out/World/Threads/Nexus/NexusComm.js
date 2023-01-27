import { DataSync } from "../../Data/DataSync.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const nexusComm = ThreadComm.createComm("nexus");
export const NexusComm = nexusComm;
DataSync.registerComm(NexusComm, {
    materials: true,
    colliders: true,
});
