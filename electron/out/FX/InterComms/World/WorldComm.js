import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEFX } from "../../DivineStarVoxelEngineFX.js";
const worldComm = CreateInterComm("data-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    DVEFX.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVEFX.__connectedToWorld = true;
    }
};
