import { CreateInterComm } from "../../../Comms/InterComm.js";
import {DVEN} from "../../DivineVoxelEngineNexus.js";

const worldComm = CreateInterComm("nexus-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    DVEN.matrixHub.onMessage(event, (messageEvent) => {});
 if (event.data[0] == "set-world-port") {
    DVEN.__connectedToWorld = true;
 }
};

