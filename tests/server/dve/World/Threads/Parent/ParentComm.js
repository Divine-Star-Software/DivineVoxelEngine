import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("start", function () {
    DVEW.__serverIsDone = true;
});
parentComm.listenForMessage("re-start", function () { });
parentComm.listenForMessage("sync-settings", (data, event) => {
    if (!event)
        return;
    const settings = data[1];
    DVEW.syncSettings(settings);
});
export const ParentComm = parentComm;
