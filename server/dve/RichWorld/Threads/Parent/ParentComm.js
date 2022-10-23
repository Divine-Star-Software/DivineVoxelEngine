import { DVERW } from "../../DivineStarVoxelEngineRichWorld.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("sync-settings", (data, event) => {
    const settings = data[1];
    DVERW.syncSettings(settings);
});
parentComm.listenForMessage("re-start", (data, event) => {
    DVERW.reStart();
});
export const ParentComm = parentComm;
