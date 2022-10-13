import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEN } from "../../DivineVoxelEngineNexus.js";
const worldComm = ThreadComm.createComm("world");
worldComm.onMessage = (event) => {
    DVEN.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVEN.__connectedToWorld = true;
    }
};
export const WorldComm = worldComm;
