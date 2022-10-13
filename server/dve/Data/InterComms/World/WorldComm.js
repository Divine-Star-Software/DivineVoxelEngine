import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVED } from "../../DivineVoxelEngineData.js";
const worldComm = ThreadComm.createComm("data-world", {});
worldComm.onMessage = (event) => {
    DVED.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVED.__connectedToWorld = true;
    }
};
export const WorldComm = worldComm;
