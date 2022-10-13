import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const worldComm = ThreadComm.createComm("world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    DVEC.matrixHub.onMessage(event, (messageEvent) => { });
    if (DVEC.environment == "browser") {
        if (event.data[0] == "set-world-port") {
            DVEC.__connectedToWorld = true;
        }
    }
    else {
        if (event[0] == "set-world-port") {
            DVEC.__connectedToWorld = true;
        }
    }
};
