import { DVEFX } from "../../DivineStarVoxelEngineFX.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("connect-world", (data, event) => {
    if (!event)
        return;
    const port = event.ports[0];
    DVEFX.worldComm.setPort(port);
});
parentComm.listenForMessage("sync-settings", (data, event) => {
    const settings = data[1];
    DVEFX.syncSettings(settings);
});
parentComm.listenForMessage("re-start", (data, event) => {
    DVEFX.reStart();
});
export const ParentComm = parentComm;
