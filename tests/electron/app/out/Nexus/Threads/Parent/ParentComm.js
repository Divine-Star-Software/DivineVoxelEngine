import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEN } from "../../DivineVoxelEngineNexus.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("sync-settings", (data, event) => {
    const settings = data[1];
    DVEN.syncSettings(settings);
});
export const ParentComm = parentComm;
