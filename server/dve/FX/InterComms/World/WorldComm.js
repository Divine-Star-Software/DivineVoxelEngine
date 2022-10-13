import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEFX } from "../../DivineStarVoxelEngineFX.js";
const worldComm = ThreadComm.createComm("fx-world", {});
worldComm.onMessage = (event) => {
    DVEFX.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVEFX.__connectedToWorld = true;
    }
};
export const WorldComm = worldComm;
