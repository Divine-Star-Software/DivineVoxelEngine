import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEB } from "../../DivineVoxelEngineBuilder.js";
const worldComm = CreateInterComm("builder-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    DVEB.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVEB.__connectedToWorld = true;
    }
};
worldComm.messageFunctions = {
    7: (data, event) => {
        DVEB.buildChunk(data[1], data[2], data[3]);
    },
};
