import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEN } from "../../DivineVoxelEngineNexus.js";
const parentComm = ThreadComm.parent;

parentComm.listenForMessage("connect-world", (data, event) => {
 if (!event) return;
 const port = event.ports[0];
 DVEN.worldComm.setPort(port);
});

parentComm.listenForMessage("sync-settings", (data, event) => {
 const settings = data[1];
 DVEN.syncSettings(settings);
});

export const ParentComm = parentComm;
